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
  })
});
