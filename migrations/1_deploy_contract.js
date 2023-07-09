// migrations/NN_deploy_upgradeable_box.js
const { deployProxy } = require('@openzeppelin/truffle-upgrades');

const Marketplace = artifacts.require('MarketPlace');
const MessierNFT = artifacts.require('MessierNFT')
const SECRET_HASH = '0x4554480000000000000000000000000000000000000000000000000000000000'
const baseInject = '100000000000000000000000000000'
const ORACLE  = '0xdE01690B6C2FDe2CC186bf530DDFBFc6d1FD696e'
const ipfs='ipfs://QmNpvkyRhoKh6hnfQvS9PCrce3iUBseutGMyMkyW3j2Nge/'
const M87Token = '0x8af5fedc0f263841c18f31d9dbcc97a47e1ab462'

module.exports = async function (deployer) {

 
    // await deployer.deploy(MessierNFT,ipfs,SECRET_HASH)
    //    // Option 2) Console log the address:
    //    .then(() => console.log(MessierNFT.address))

 await deployProxy(Marketplace,      
    [
      M87Token,
      "0x0dFb023FD9E124031b7f2Fb73f167BaA9996378a",
      "0x0dFb023FD9E124031b7f2Fb73f167BaA9996378a",
      "0x0dFb023FD9E124031b7f2Fb73f167BaA9996378a",
      SECRET_HASH,
      ORACLE
    ]
    , {deployer,initializer: 'setup'})
    
//     console.log("marketplace ",marketplace.address)

//     console.log('Deployed', instance.address);
};