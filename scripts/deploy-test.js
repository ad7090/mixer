
const { ethers, upgrades } = require("hardhat");
async function main() {
    const M87_address = "0x8AF5FedC0f263841C18F31D9DbCC97A47e1aB462"
    const IPFS_BASE_URL = 'ipfs://QmUp6wjcGCfEuxndhbNYyA3BKuF5MmJZSDyGBDNsvQPCBN'
    const SECRET_HASH = '0x4554480000000000000000000000000000000000000000000000000000000000'
    const ORACLE ='0xdE01690B6C2FDe2CC186bf530DDFBFc6d1FD696e'
    const startingPrice = 178100000; // 178.1 million
const basePrice = "10000000000000000" //0.01 eth
const bestPrice = "100000000000000000" //0.1 eth
const bidPrice = "20000000000000000" //0.02 eth
const value = "1000000000000000000" //1 eth
const OFF_CHAIN_AMOUNT = "1000" //counter for each token
const user_1 = '0x39E3f4D9f59edD207Bfc4BDa27a44Ea2998dA4AF'
let tokenid = 1
    const Xtoken = await ethers.getContractFactory("simulatorM87");
  let  simulatorXtoken = await Xtoken.deploy();
   console.log("simulatorX",simulatorXtoken.address)
    //MessierNFT
      //M87 simulator
      const simulatorM87 = await ethers.getContractFactory("simulatorM87");
    let   simulatorM87Token = await simulatorM87.deploy();
      console.log("simulatorM87",simulatorM87Token.address)
  //reward example
   //MessierNFT
   const MessierNFT = await ethers.getContractFactory("MessierNFT");
   let MessierNFTToken = await MessierNFT.deploy(IPFS_BASE_URL);
   console.log("MessierNFT : ",MessierNFTToken.address)
   //MTT
   const MTTToken = await ethers.getContractFactory("MTTToken");
   let MTTTokenToken = await MTTToken.deploy(SECRET_HASH);
   console.log("MTTToken : ",MTTTokenToken.address)
   //MOTT
   const MOTTToken = await ethers.getContractFactory("MOTTToken");
   let  MOTTTokenToken = await MOTTToken.deploy(SECRET_HASH);
   console.log("MOTTToken : ",MOTTTokenToken.address)
   const Marketplace = await ethers.getContractFactory("MarketPlace")

   let  marketplace = await upgrades.deployProxy(Marketplace,      
    [
     M87_address,
     MessierNFTToken.address,
     MTTTokenToken.address,
     MOTTTokenToken.address,
     SECRET_HASH,
     ORACLE
   ]
    , {initializer: 'setup'})
    
    console.log("marketplace :",marketplace.address)
      const _dao = await ethers.getContractFactory("Dao")
      let  Dao = await upgrades.deployProxy(_dao,      
     [
        ORACLE,//oracle
       M87_address,
       SECRET_HASH,
       [8,7,3,11]
    ]
     , {initializer: 'setup'})

     console.log("Dao :",Dao.address)
     const _sv = await ethers.getContractFactory("Supernova")
     let   Supernova = await upgrades.deployProxy(_sv,      
      [
       MessierNFTToken.address,
       SECRET_HASH,
       M87_address,
       ORACLE,//oracle
       Dao.address,
       MTTTokenToken.address,
     ]
      , {initializer: 'setup'})
      console.log("Supernova :  ",Supernova.address)
      console.log("has been started setting default data ... 🚀 ")
      await delay(10000);
      
     
      await Dao._Set_SupernovaBridgeBridge(Supernova.address)
      await delay(15000);
      console.log("bride : ",await Dao.getBridge())
      await marketplace._Set_SupernovaBridgeBridge(Supernova.address)
      await delay(15000);
      console.log("bride : ",await marketplace.getBridge())
    //   await simulatorM87Token.transfer(user1.address,startingPrice*10)
     
      await simulatorXtoken.approve(Supernova.address,startingPrice*100000)
      await Supernova.PutInTreasuryToken(startingPrice*100000,simulatorXtoken.address) 
      // await delay(15000);
      // await simulatorM87Token.transferFrom("0xDB1fb3C23b509d04B9985f7aB720Ba4C4f863a9a",user_1,startingPrice*10)
      
      console.log("has been finished setting default data.   ✅ ")

      await marketplace.makeBidInit("1",startingPrice+1)
      console.log("has been finished setting default data.   ✅ ")
      
}
const delay = ms => new Promise(res => setTimeout(res, ms));
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })
  
    