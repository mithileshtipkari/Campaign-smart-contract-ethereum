const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledCampaignFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
  'captain spread subway garment major stairs anger elbow gun syrup slender frost',
  'https://rinkeby.infura.io/v3/3bf791424ce2464e911c3f259201fd8a'
);

const web3 = new Web3(provider);

const deployContract = async () => {
  try{

  const accounts = await web3.eth.getAccounts();
  console.log('Deploying from account -', accounts[0]);

  console.log('compiledCampaignFactory.interface --', compiledCampaignFactory.interface);
  console.log('compiledCampaignFactory.bytecode - ', compiledCampaignFactory.bytecode);
  const result = await new web3.eth.Contract(JSON.parse(compiledCampaignFactory.interface))
    .deploy({data : compiledCampaignFactory.bytecode})
    .send({from : accounts[0], gas : '2000000'});

  console.log('Contract is deployed to - ', result.options.address);
} catch (err){
  console.log('error here-', err);
}
};

deployContract();
