
const { ethers, upgrades } = require("hardhat");
const { poseidonContract } = require('circomlibjs');
const { deployBytes } = require('./hardhat.utils');
async function main() {
  
        const abi = poseidonContract.generateABI(2);
        const bytecode = poseidonContract.createCode(2);
        const poseidon = await deployBytes("Poseidon", abi, bytecode);
     
        console.log("Hasher :  ",poseidon.address)



        const MixerD = await ethers.getContractFactory("PrivacyPool");
        let Mixer = await MixerD.deploy(
        poseidon.address
        );
        console.log("Mixer ",Mixer.address)

}
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })
  
    