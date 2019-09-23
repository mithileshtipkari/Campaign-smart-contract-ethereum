const fse = require('fs-extra');
const fs = require('fs');
const path = require('path');
const solc = require('solc');

let buildPath =  path.resolve(__dirname, 'build');
fse.removeSync(buildPath);

const contractPath = path.resolve(__dirname,'contracts','Campaign.sol');
// console.log('contractPath-', contractPath);

const source = fse.readFileSync(contractPath, 'utf8');
// console.log('s -', source);

//compile the contract
const compiled = solc.compile(source, 1).contracts;
console.log('compile - ', compiled);

fse.ensureDirSync(buildPath);

for(let contract in compiled){
  console.log('contract -', contract);
  let contractName = contract.substr(1);
  fse.outputJsonSync(
    path.resolve(buildPath, contractName + '.json'),
    compiled[contract]
  );
}
