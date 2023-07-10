// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

interface IVerifier {

  
    function _verifyWithdrawFromSubsetProof(uint[8] calldata flatProof,uint root,uint subsetRoot,
        uint nullifier,uint assetMetadata, uint   withdrawMetadata) external  returns(bool);
   
} 
 