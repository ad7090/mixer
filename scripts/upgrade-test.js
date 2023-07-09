
async function main() {
    const MarketPlace = await ethers.getContractFactory("DaoV2")
    // console.log(OpenHatch)
    let box = await upgrades.upgradeProxy("0x6Def73B4FfEB551FE4c1683Ba1DAE512D32DE532", MarketPlace)
    console.log("Your upgraded proxy is done!", box.address)

    // const Dao = await ethers.getContractFactory("DaoV2")
    // // console.log(OpenHatch)
    // let DaoV = await upgrades.upgradeProxy("0x13203bD89506a9151d86aAAcBa5BA4Aaef97e47e", Dao)
    // console.log("Your upgraded proxy is done!", DaoV.address)

    // const SupernovaV = await ethers.getContractFactory("SupernovaV2")
    // // console.log(OpenHatch)
    // let Supernova = await upgrades.upgradeProxy("0xD59d1d030eBDB870A7f767f607211357C868Cd1d", SupernovaV)
    // console.log("Your upgraded proxy is done!", Supernova.address)
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