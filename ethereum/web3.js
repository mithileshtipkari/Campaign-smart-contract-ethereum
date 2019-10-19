import Web3 from 'web3';

let web3;

if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined'){
  //window object present that means we are inside the browser and metamask is also present
  web3 = new Web3(window.web3.currentProvider);
} else {
  //we are on the server or browser does not have metamask
  //so make our own provider which connects to remote node on rinkeby network and use that to create instance of web3
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/3bf791424ce2464e911c3f259201fd8a'
  );
  web3 = new Web3(provider);
}


export default web3;
