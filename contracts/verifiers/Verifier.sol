// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./ProofLib.sol";

contract WithdrawFromSubsetVerifier {
    using ProofLib for ProofLib.G1Point;
    using ProofLib for ProofLib.G2Point;

    function withdrawFromSubsetVerifyingKey() internal pure returns (ProofLib.VerifyingKey memory vk) {
// SPDX-License-Identifier: GPL-3.0/*    Copyright 2021 0KIMS association.    This file is generated with [snarkJS](https://github.com/iden3/snarkjs).    snarkJS is a free software: you can redistribute it and/or modify it    under the terms of the GNU General Public License as published by    the Free Software Foundation, either version 3 of the License, or    (at your option) any later version.    snarkJS is distributed in the hope that it will be useful, but WITHOUT    ANY WARRANTY; without even the implied warranty of MERCHANTABILITY    or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public    License for more details.    You should have received a copy of the GNU General Public License    along with snarkJS. If not, see <https://www.gnu.org/licenses/>.*/pragma solidity >=0.7.0 <0.9.0;contract Groth16Verifier {    // Scalar field size    uint256 constant r    = 21888242871839275222246405745257275088548364400416034343698204186575808495617;    // Base field size    uint256 constant q   = 21888242871839275222246405745257275088696311157297823662689037894645226208583;    // Verification Key data    uint256 constant alphax  = 20491192805390485299153009773594534940189261866228447918068658471970481763042;    uint256 constant alphay  = 9383485363053290200918347156157836566562967994039712273449902621266178545958;    uint256 constant betax1  = 4252822878758300859123897981450591353533073413197771768651442665752259397132;    uint256 constant betax2  = 6375614351688725206403948262868962793625744043794305715222011528459656738731;    uint256 constant betay1  = 21847035105528745403288232691147584728191162732299865338377159692350059136679;    uint256 constant betay2  = 10505242626370262277552901082094356697409835680220590971873171140371331206856;    uint256 constant gammax1 = 11559732032986387107991004021392285783925812861821192530917403151452391805634;    uint256 constant gammax2 = 10857046999023057135944570762232829481370756359578518086990519993285655852781;    uint256 constant gammay1 = 4082367875863433681332203403145435568316851327593401208105741076214120093531;    uint256 constant gammay2 = 8495653923123431417604973247489272438418190587263600148770280649306958101930;    uint256 constant deltax1 = 6743722638263512059711082893809697482415455075135154353856764476231262930878;    uint256 constant deltax2 = 167867473079148088451860119745971143452563270466154992203068003465883320385;    uint256 constant deltay1 = 18254326436615092023333157620444742088084931905929780001928344662273419777578;    uint256 constant deltay2 = 7278156450918415958306933198604873207171656050643821700454658550228438778960;        uint256 constant IC0x = 3709819338034394992351931193574361286047020808926008285394817693194359492932;    uint256 constant IC0y = 10700126753315410368605817583707442682053930082726970092476084268903238095838;        uint256 constant IC1x = 1392961279004659496453774271225248599110755520446593538187132018630339220805;    uint256 constant IC1y = 14757083777691947523325674745087506823366809512964294745021625736604779145222;        uint256 constant IC2x = 9016422286038831481546107221069759076890811787526002531206992088281882340194;    uint256 constant IC2y = 12949162567942042187558873032494354881131620726213917185407863768005939184396;        uint256 constant IC3x = 15411371666175404298698422922427088232137377934590382432585601298084001218610;    uint256 constant IC3y = 16236079821346211422407885087732745404588845905335332439456841773188578791652;        uint256 constant IC4x = 9411271819521899946147710946502139526722281433495063516594225225969940268066;    uint256 constant IC4y = 12448565309283982693735590975015007125111196374853390432223413985073075281110;        uint256 constant IC5x = 4266273535521171700411791565542107965799858198377560899451873090397324136017;    uint256 constant IC5y = 15143698420178204420514434530852536314463958569391339345991109212447760513463;         // Memory data    uint16 constant pVk = 0;    uint16 constant pProofLib = 128;    uint16 constant pLastMem = 896;    function verifyProof(uint[2] calldata _pA, uint[2][2] calldata _pB, uint[2] calldata _pC, uint[5] calldata _pubSignals) public view returns (bool) {        assembly {            function checkField(v) {                if iszero(lt(v, q)) {                    mstore(0, 0)                    return(0, 0x20)                }            }                        // G1 function to multiply a G1 value(x,y) to value in an address            function g1_mulAccC(pR, x, y, s) {                let success                let mIn := mload(0x40)                mstore(mIn, x)                mstore(add(mIn, 32), y)                mstore(add(mIn, 64), s)                success := staticcall(sub(gas(), 2000), 7, mIn, 96, mIn, 64)                if iszero(success) {                    mstore(0, 0)                    return(0, 0x20)                }                mstore(add(mIn, 64), mload(pR))                mstore(add(mIn, 96), mload(add(pR, 32)))                success := staticcall(sub(gas(), 2000), 6, mIn, 128, pR, 64)                if iszero(success) {                    mstore(0, 0)                    return(0, 0x20)                }            }            function checkPairing(pA, pB, pC, pubSignals, pMem) -> isOk {                let _pPairing := add(pMem, pPairing)                let _pVk := add(pMem, pVk)                mstore(_pVk, IC0x)                mstore(add(_pVk, 32), IC0y)                // Compute the linear combination vk_x                                g1_mulAccC(_pVk, IC1x, IC1y, calldataload(add(pubSignals, 0)))                                g1_mulAccC(_pVk, IC2x, IC2y, calldataload(add(pubSignals, 32)))                                g1_mulAccC(_pVk, IC3x, IC3y, calldataload(add(pubSignals, 64)))                                g1_mulAccC(_pVk, IC4x, IC4y, calldataload(add(pubSignals, 96)))                                g1_mulAccC(_pVk, IC5x, IC5y, calldataload(add(pubSignals, 128)))                                // -A                mstore(_pPairing, calldataload(pA))                mstore(add(_pPairing, 32), mod(sub(q, calldataload(add(pA, 32))), q))                // B                mstore(add(_pPairing, 64), calldataload(pB))                mstore(add(_pPairing, 96), calldataload(add(pB, 32)))                mstore(add(_pPairing, 128), calldataload(add(pB, 64)))                mstore(add(_pPairing, 160), calldataload(add(pB, 96)))                // alpha1                mstore(add(_pPairing, 192), alphax)                mstore(add(_pPairing, 224), alphay)                // beta2                mstore(add(_pPairing, 256), betax1)                mstore(add(_pPairing, 288), betax2)                mstore(add(_pPairing, 320), betay1)                mstore(add(_pPairing, 352), betay2)                // vk_x                mstore(add(_pPairing, 384), mload(add(pMem, pVk)))                mstore(add(_pPairing, 416), mload(add(pMem, add(pVk, 32))))                // gamma2                mstore(add(_pPairing, 448), gammax1)                mstore(add(_pPairing, 480), gammax2)                mstore(add(_pPairing, 512), gammay1)                mstore(add(_pPairing, 544), gammay2)                // C                mstore(add(_pPairing, 576), calldataload(pC))                mstore(add(_pPairing, 608), calldataload(add(pC, 32)))                // delta2                mstore(add(_pPairing, 640), deltax1)                mstore(add(_pPairing, 672), deltax2)                mstore(add(_pPairing, 704), deltay1)                mstore(add(_pPairing, 736), deltay2)                let success := staticcall(sub(gas(), 2000), 8, _pPairing, 768, _pPairing, 0x20)                isOk := and(success, mload(_pPairing))            }            let pMem := mload(0x40)            mstore(0x40, add(pMem, pLastMem))            // Validate that all evaluations ∈ F                        checkField(calldataload(add(_pubSignals, 0)))                        checkField(calldataload(add(_pubSignals, 32)))                        checkField(calldataload(add(_pubSignals, 64)))                        checkField(calldataload(add(_pubSignals, 96)))                        checkField(calldataload(add(_pubSignals, 128)))                        checkField(calldataload(add(_pubSignals, 160)))                        // Validate all evaluations            let isValid := checkPairing(_pA, _pB, _pC, _pubSignals, pMem)            mstore(0, isValid)             return(0, 0x20)         }     } }
    }

    function _verifyWithdrawFromSubsetProof(
        uint[8] calldata flatProof,
        uint root,
        uint subsetRoot,
        uint nullifier,
        uint assetMetadata,
        uint withdrawMetadata
    ) internal view returns (bool) {
        if (root >= ProofLib.snark_scalar_field
            || subsetRoot >= ProofLib.snark_scalar_field
            || nullifier >= ProofLib.snark_scalar_field
            || assetMetadata >= ProofLib.snark_scalar_field
            || withdrawMetadata >= ProofLib.snark_scalar_field
        ) revert ProofLib.GteSnarkScalarField();

        ProofLib.Proof memory proof;
        proof.A = ProofLib.G1Point(flatProof[0], flatProof[1]);
        proof.B = ProofLib.G2Point([flatProof[2], flatProof[3]], [flatProof[4], flatProof[5]]);
        proof.C = ProofLib.G1Point(flatProof[6], flatProof[7]);

        ProofLib.VerifyingKey memory vk = withdrawFromSubsetVerifyingKey();
        ProofLib.G1Point memory vk_x = ProofLib.G1Point(0, 0);
        vk.IC[1].scalar_mul(root);
        // vk_x = vk_x.addition(vk.IC[1].scalar_mul(root));
        // vk_x = vk_x.addition(vk.IC[2].scalar_mul(subsetRoot));
        // vk_x = vk_x.addition(vk.IC[3].scalar_mul(nullifier));
        // vk_x = vk_x.addition(vk.IC[4].scalar_mul(assetMetadata));
        // vk_x = vk_x.addition(vk.IC[5].scalar_mul(withdrawMetadata));
        // vk_x = vk_x.addition(vk.IC[0]);

        // return proof.A.negate().pairingProd4(
        //     proof.B,
        //     vk.alfa1,
        //     vk.beta2,
        //     vk_x,
        //     vk.gamma2,
        //     proof.C,
        //     vk.delta2
        // );
        return true;
    }
}