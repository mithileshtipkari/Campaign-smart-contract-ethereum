import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(campaignFactory.interface),
  '0xf2b550FA251911af1B39899e59f3b18350a54a02'
);

export default instance;
