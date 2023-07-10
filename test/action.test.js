
const { expect,assert } = require("chai");
const { ethers, upgrades } = require("hardhat");
const Web3 = require('web3')
const { poseidonContract } = require('circomlibjs');
const { deployBytes } = require('../scripts/hardhat.utils');
const { BigNumber } = require('@ethersproject/bignumber');
const { keccak256 } = require('@ethersproject/solidity');
const {
  MerkleTree,
  generateProof,
  verifyProof,
  utils,
  poseidon,
} = require('vmtree-sdk');

// const VERIFIER_JSON = require('../circuits/out/withdraw_from_subset_verifier.json');
// const WASM_FNAME = "./circuits/out/withdraw_from_subset_js/withdraw_from_subset.wasm";
// const ZKEY_FNAME = "./circuits/out/withdraw_from_subset_final.zkey";
const ALLOWED = utils.getZero("allowed");
const BLOCKED = utils.getZero("blocked");
const ZKP_TEST_TIMEOUT = 20000; // alter if necessary.





function hashAssetMetadata({token, denomination}) {
  return BigNumber.from(
      keccak256(["address", "uint"], [token, denomination])
  ).mod(utils.F.p.toString());
};

function hashWithdrawMetadata({recipient, refund, relayer, fee}) {
  return BigNumber.from(
      keccak256(["address", "uint", "address", "uint"], [recipient, refund, relayer, fee])
  ).mod(utils.F.p.toString());
};

function verifyMerkleProof({pathElements, pathIndices, leaf, root}) {
  pathElements.forEach((element, i) => {
      leaf = !pathIndices[i] ?
          poseidon([leaf, element]) : poseidon([element, leaf]);
  });
  return leaf == root;
}


describe("Depoly ....", function () {
  let Mixer,secrets,assetMetadata,withdrawMetadata;

  before(async function () {
    const [owner,user1] = await ethers.getSigners();   
    const abi = poseidonContract.generateABI(2);
    const bytecode = poseidonContract.createCode(2);
    const poseidon = await deployBytes("Poseidon", abi, bytecode);
 
    const MixerD = await ethers.getContractFactory("PrivacyPool");
     Mixer = await MixerD.deploy(
    poseidon.address
    );
    console.log("Mixer ",Mixer.address)

    await new Promise(resolve => setTimeout(resolve,3000));

    secrets = utils.unsafeRandomLeaves(42);
    console.log({secrets})
    assetMetadata = hashAssetMetadata({
      token: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      denomination: "1000000000000000000"
  });

  withdrawMetadata = hashWithdrawMetadata({
    recipient: "0x0000000000000000000000000000000000000000",
    refund: "0",
    relayer: "0x0000000000000000000000000000000000000000",
    fee: "0"
})

    })

    it("deposit", async function () {  
      const [owner,user1] = await ethers.getSigners();  
      
      const commitment =  poseidon([
        poseidon([secrets[0]]),
        assetMetadata
    ]);
 
    
      await Mixer.connect(user1).deposit(commitment,ethers.utils.parseEther("0.001"),{ value: ethers.utils.parseEther("0.001") })
      //     
      await new Promise(resolve => setTimeout(resolve, 30000));
    })

    it("withdraw", async function () {  
      const [owner,user1] = await ethers.getSigners();  
      const flatProof = [1, 2, 3, 4, 5, 6, 7, 8];
      const root = 123;
      const subsetRoot = 456;
      const nullifier = 789;
      const amount = ethers.utils.parseEther("0.001");
      const recipient = owner.address;
      const refund = ethers.utils.parseEther("0.001");
      const relayer = user1.address;
      const fee = 10;

      const input = stringifyBigInts({
        // public
        root: tree.root(),
        nullifierHash: pedersenHash(deposit.nullifier.leInt2Buff(31)),
        relayer: operator,
        recipient,
        fee,
        refund,

        // private
        nullifier: deposit.nullifier,
        secret: deposit.secret,
        pathElements: pathElements,
        pathIndices: pathIndices,
      })
      await Mixer.connect(owner).withdraw(
        flatProof,
        root,
        subsetRoot,
        nullifier,
        amount,
        recipient,
        refund,
        relayer,
        fee
      );
      // const { pathElements: mainProof, pathRoot: root } = await Mixer.path(0);
      // console.log({mainProof,root})
      // const { pathElements: subsetProof, pathRoot: subsetRoot } = await Mixer.path(0);
      // console.log({subsetProof,subsetRoot})
      // const secret = secrets[0];
      // const nullifier = poseidon([secret, 1n, path]);
      // console.log({nullifier})
      // const input = utils.stringifyBigInts({
      //     root,
      //     subsetRoot,
      //     nullifier,
      //     assetMetadata,
      //     withdrawMetadata,
      //     secret,
      //     path,
      //     mainProof,
      //     subsetProof
      // });    
      // console.log({input})
    })
})
