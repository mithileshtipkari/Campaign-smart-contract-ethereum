const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledCampaignFactory = require('./build/CampaignFactory.json');

  const provider = new HDWalletProvider(
    'captain spread subway garment major stairs anger elbow gun syrup slender frost',
    'https://rinkeby.infura.io/v3/3bf791424ce2464e911c3f259201fd8a'
  );

const web3 = new Web3(provider);

const testfun = async () => {
  try{

    const accounts = await web3.eth.getAccounts();
    console.log('acc -', accounts);

    // const fInstance = new web3.eth.Contract(
    //   JSON.parse(compiledCampaignFactory.interface),
    //   '0x9Ba824CD108a9bb894878A1a8Ba08540ab63FBeb'
    // );
    //
    // console.log('f -', fInstance);
    //
    // const c = await fInstance.methods.campaignCount().call();
    // console.log('count -', c);
    // const campaignCreated = await fInstance.methods.createCampaign(1,"Superman","save the world").send({
    //   from: accounts[0],
    //   value: '20000000'
    // });

    // const c1 = await fInstance.methods.campaignCount().call();
    // console.log('count -', c1);

    // const arr = await fInstance.methods.campaignInfoArray(0).call();
    // console.log('arr -', arr);
  } catch(err){
    console.log('err occured -', err);
  }
}

testfun();
