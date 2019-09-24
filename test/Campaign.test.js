const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledCampaignFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach( async () => {
  accounts = await web3.eth.getAccounts();
  console.log('acc-', accounts[0]);

  //deploy the CampaignFactory contract which can be used to deploy multiple campaign contracts
  factory = await new web3.eth.Contract(JSON.parse(compiledCampaignFactory.interface))
    .deploy({ data : compiledCampaignFactory.bytecode})
    .send({ from : accounts[0], gas : '1000000'});

  //call createCampaign function of CampaignFactory which creates and deploys a new Campaign contract
  await factory.methods.createCampaign('100').send({
    from : accounts[0],
    gas : '1000000'
  });

  //fetch the address of deployed contract (currently deployed on ganache local network)
  [campaignAddress] = await factory.methods.getDeployedCampaigns().call(); // [campaignAddress] -> assign first element of returned array to campaignAddress variable

  campaign = await new web3.eth.Contract(JSON.parse(compiledCampaign.interface), campaignAddress); // (ABI of Campaign, address at which it is already deployed)
});

describe('Campaign', () => {
  it('deploys factory and campaign', () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });

  it('factory returns deployed contract', async () => {
    const deployedAddress = await factory.methods.getDeployedCampaigns().call();
    assert.equal(deployedAddress, campaign.options.address);
  })

  it('makes caller as the manager', async () => {
    const manager = await campaign.methods.manager().call();
    assert.equal(accounts[0], manager);
  });

  it('allows people to contribute to Campaign and mark them as a contributor/approver', async () => {
    await campaign.methods.contribute().send({
      value : '220',
      from : accounts[1]
    });
    const isContributor = await campaign.methods.approvers(accounts[1]).call();
    assert(isContributor);
  });

  it('checks for minimum contribution', async () => {
    try{
      await campaign.methods.contribute().send({
        value : '4',
        from : accounts[1]
      });
    } catch(err){
      assert(err);
    }
  });

  it('allows manager to create a payment request', async () =>{
    await campaign.methods.createRequest('purchase office stationary', 9999, '0xFEC903eCf63DA93Bd3821b4DeB01dbD2b9Be279e').send({
      from : accounts[0],
      gas : '1000000'
    });
    const request = await campaign.methods.requests(0).call();
    assert.equal(request.description, 'purchase office stationary');
  });

  it('works end to end', async () => {
    //contribute to campaign
    await campaign.methods.contribute().send({
      from : accounts[0],
      value : web3.utils.toWei('10', 'ether')
    });

    //manager will create a payment request
    await campaign.methods.createRequest('install internet', web3.utils.toWei('5', 'ether'), accounts[2]).send({
      from : accounts[0],
      gas : '1000000'
    });

    //let us note the current balance of accounts[2]
    let currentBalance = await web3.eth.getBalance(accounts[2]);
    currentBalance = web3.utils.fromWei(currentBalance, 'ether');
    currentBalance = parseFloat(currentBalance);
    console.log('currentBalance -', currentBalance); //after finalizing the request accounts[2] will receive the money in payment request

    //now contributors will approve the request
    await campaign.methods.approveRequest(0).send({
      from : accounts[0],
      gas : '1000000'
    });

    // currently at this stage, contributors - 1, approvers - 1
    //now manager will finalize the request (it will be finalized because approvers(1) are greater than half-of-contributors(0))
    await campaign.methods.finalizeRequest(0).send({
      from : accounts[0],
      gas : '1000000'
    });

    //check accounts[2] balance, if greater he received the money in payment request and hence request is successfully finalized
    let updatedBalance = await web3.eth.getBalance(accounts[2]);
    updatedBalance = web3.utils.fromWei(updatedBalance, 'ether');
    updatedBalance = parseFloat(updatedBalance);
    console.log('updated -', updatedBalance);

    assert(updatedBalance > currentBalance);
  });
});
