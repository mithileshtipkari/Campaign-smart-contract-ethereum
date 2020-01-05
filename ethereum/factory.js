import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x47faBE36Bdc86E269c1CCbA55164ffed5e3c0F08'
);

// console.log('instance ----\n', instance);

export default instance;
