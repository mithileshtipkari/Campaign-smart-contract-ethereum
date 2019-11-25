import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xaE023d70D0328f59a0D058D118feae3671DC04C5'
);

export default instance;
