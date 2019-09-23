const fs = require('fs-extra');
const path = require('path');
const solc = require('solc');

// try{
  const buildPath =  path.resolve(__dirname, 'build');
  fs.removeSync(buildPath);

  const contractPath = path.resolve(__dirname,'contracts','Campaign.sol');
  // console.log('contractPath-', contractPath);

  const source = fs.readFileSync(contractPath, 'utf8');
  // console.log('s -', source);

  //compile the contract
  const compiled = solc.compile(source, 1).contracts;
  console.log('compile - ', compiled);

console.log('make');
  fs.ensureDirSync(buildPath);
console.log('made');

for(let contract in compiled){
  console.log('contract -', contract);

  fs.outputJsonSync(path.resolve(buildPath, contract + '.json'), compiled[contract]);
}
// } catch(e) {
//   console.log('error -', e);
// }
