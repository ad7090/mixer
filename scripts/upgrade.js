

const { ethers, upgrades } = require("hardhat");
async function main() {
    const [owner] = await ethers.getSigners();  
    // const MarketPlace = await ethers.getContractFactory("MarketPlaceV2")
    // // console.log(OpenHatch)
    // let box = await upgrades.upgradeProxy("0xA638f66B22C72dCaab16CdFcD3409be482EAa612", MarketPlace)
    // console.log("Your upgraded proxy is done!", box.address)

    // const Dao = await ethers.getContractFactory("SupernovaV2")
    // // console.log(OpenHatch)
    // let DaoV = await upgrades.upgradeProxy("0xad386fE1c06a485dbc542c4912ce7D6B91296b61", Dao)
    // console.log("Your upgraded proxy is done!", DaoV.address)

      const MarketPlace = await ethers.getContractFactory("SupernovaV3")
    // console.log(OpenHatch)
    let box = await upgrades.upgradeProxy("0x9F1eB6262a2ba6b0F81a5Cd181dA931048a4ebea", MarketPlace)
    console.log("Your upgraded proxy is done!", box.address)
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })
// verify  : npx hardhat verify 0x1AXXXXXXXXX  OR npx hardhat verify --network mainnet DEPLOYED_CONTRACT_ADDRESS "Constructor argument 1"
// deploy  : npx hardhat run scripts/deploy.js    
// upgrade : npx hardhat run scripts/upgrade.js        

// circom withdraw_from_subsets.circom --r1cs --wasm --sym -o out

// snarkjs g16s circuits/out/withdraw_from_subset.r1cs powers_of_tau/powersOfTau28_hez_final_20.ptau circuits/out/withdraw_from_subset_0000.zkey

// snarkjs zkc circuits/out/withdraw_from_subset_0000.zkey circuits/out/withdraw_from_subset_final.zkey -v -e='vitaliks simple mixer'

// snarkjs zkev circuits/out/withdraw_from_subset_final.zkey circuits/out/withdraw_from_subset_verifier.json   

// snarkjs zkesv circuits/out/withdraw_from_subset_final.zkey circuits/out/withdraw_from_subset_verifier.sol   

// snarkjs zkesv circuits/out/withdraw_from_subset_final.zkey circuits/out/withdraw_from_subset_verifier.sol 


// node scripts/export.js



// circom withdraw_from_subset.circom --r1cs --wasm --sym -o out