import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x0E6658552E9Cc13F396cCCEEE5900F68b0040a9e'
);

// console.log('instance ----\n', instance);

export default instance;
