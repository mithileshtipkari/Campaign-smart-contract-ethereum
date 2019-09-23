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
});