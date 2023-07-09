require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-ethers")
require('@openzeppelin/hardhat-upgrades')
require("@nomiclabs/hardhat-etherscan")


require('dotenv').config();
const sepollia = process.env["sepollia"];
const MIANNET = process.env["MIANNET"];

module.exports = {
  defaultNetwork: "goerli",
  networks: {
    hardhat: {
    },
    // localhost: {
    //   url: "http://127.0.0.1:8545",
    //   accounts: [owner,user_2,user_3,user_4,Oracle],

    // },
    goerli: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/EjeJH0BNBGnd_8VZZom-afiY6sLHfSDi',//'https://goerli.infura.io/v3/85ae6a6cb1cc4978ab4811c73c0665ec',//`https://sepolia.infura.io/v3/85ae6a6cb1cc4978ab4811c73c0665ec`,
      accounts: [sepollia,MIANNET]
    },
    // mainnet: {
    //   url: `https://eth-mainnet.g.alchemy.com/v2/GpWf1EpJ1xN2HqM2qZSD0csSrxL_4PBo`,
    //   accounts: [MIANNET]
    // }
  },
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 1000000000000
  },
  etherscan: {
    apiKey: "A2YP765YEK3GUFH1ETUPU17G2NRN6E9QDM", // Your Etherscan API key
  },
}

