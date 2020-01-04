import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x647c2b4579F9180d435a189B53EE9665Eef56357'
);

// console.log('instance ----\n', instance);

export default instance;
