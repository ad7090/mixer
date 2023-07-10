
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
 const cc = '0x1a6b2b93234f1443e225dfd78ef12a69ad417fde36a5a5de1dee3982b5e89197'
    
      await Mixer.connect(user1).deposit(cc,ethers.utils.parseEther("0.001"),{ value: ethers.utils.parseEther("0.001") })
      //     
      // await new Promise(resolve => setTimeout(resolve, 30000));
    })

    it("withdraw", async function () {  
      const [owner,user1] = await ethers.getSigners();  
      const flatProof =  [
        "14209217016923047828107835983043022916090572012217426330941662632755282188868",
        "15844444060520159779306725474302741194414595661729738698820449493791550185732",
        "7080187966657916429883257096801722254477772629979200666889439447760863457592",
        "647851111942300931236125842033296955755212431327804025638752837159365632474",
        "13267187315971186894512379249755856050451113974106127598022892026461973160043",
        "14304956504448971074207884073704026090868830722549950800787908376031638225170",
        "18428694561508659550309133983026496172458136309046810150677068496377087404854",
        "7549593068793521274526954431399981253129233917995492368918352811235103928096"
      ];
      const root =await Mixer.getLatestRoot()// "0x1796d9a6880e408a93593de6fb7e00c87708f7180999761bfea12a8652349411";
      const subsetRoot = "0x1d6b8df358acfb40140e921985f70bf4ac79c1460680b29d510866eeae0425a8";
      const nullifier = "0x2f76c9a28db71edb7fbdcb7d013b7a7868a34f5be5212304ae9f40d772459e0b";
      const amount = ethers.utils.parseEther("0.001");
      const recipient = owner.address;
      // const refund = ethers.utils.parseEther("0.001");
      const relayer = "0x000000000000000000000000000000000000dEaD";
      const fee = 10;
console.log(root)
      // const input = stringifyBigInts({
      //   // public
      //   root: tree.root(),
      //   nullifierHash: pedersenHash(deposit.nullifier.leInt2Buff(31)),
      //   relayer: operator,
      //   recipient,
      //   fee,
      //   refund,

      //   // private
      //   nullifier: deposit.nullifier,
      //   secret: deposit.secret,
      //   pathElements: pathElements,
      //   pathIndices: pathIndices,
      // })
      await Mixer.connect(owner).withdraw(
        flatProof,
        root,
        subsetRoot,
        nullifier,
        amount,
        recipient,
        // refund,
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
