// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./verifiers/Verifier.sol";
import "./MerkleTree.sol"; 

contract PrivacyPool is ReentrancyGuard, MerkleTree, WithdrawFromSubsetVerifier {
    using ProofLib for bytes;
    using SafeERC20 for IERC20;
 
    event Deposit(
        uint indexed commitment,
        address indexed token,
        uint amount,
        uint leafIndex,
        uint timestamp
    );
    event Withdrawal(
        address recipient,
        address indexed relayer,
        uint indexed subsetRoot,
        uint nullifier,
        uint fee
    );

    error FeeExceedsAmount();
    error InvalidZKProof();
    error MsgValueInvalid();
    error NoteAlreadySpent();
    error UnknownRoot();
    mapping (uint => bool) public nullifiers;

    constructor(address poseidon) MerkleTree(poseidon, bytes("empty").snarkHash()) {}

    function depositToken(uint commitment, address token, uint amount)
        public
        payable
        nonReentrant
        returns (uint)
    {
        if (token == 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE) {
            if (msg.value != amount) revert MsgValueInvalid();
        } else {
            IERC20(token).safeTransferFrom(msg.sender, address(this), amount);
        }
        uint assetMetadata = abi.encode(token, amount).snarkHash();
        uint leaf = hasher.poseidon([commitment, assetMetadata]);
        uint leafIndex = insert(leaf);
        emit Deposit(commitment, token, amount, leafIndex, block.timestamp);
        return leafIndex;
    }
    function deposit(uint commitment,  uint amount)
        public
        payable
        nonReentrant
        returns (uint)
    {
        
        
        uint assetMetadata = abi.encode(address(0xdead), amount).snarkHash();
        uint leaf = hasher.poseidon([commitment, assetMetadata]);
        uint leafIndex = insert(leaf);
        emit Deposit(commitment, address(0xdead), amount, leafIndex, block.timestamp);
        return leafIndex;
    }

 
    function withdraw(
        uint[8] calldata flatProof,
        uint root,
        uint subsetRoot,
        uint nullifier,
        uint amount,
        address recipient,
        // uint refund,
        address relayer,
        uint fee
    )
        public
        payable
        nonReentrant
        returns (bool)
    {
        if (nullifiers[nullifier]) revert NoteAlreadySpent();
        if (!isKnownRoot(root)) revert UnknownRoot();
        // if (fee > amount) revert FeeExceedsAmount();
        uint assetMetadata = abi.encode( address(0xdead), amount).snarkHash();
        uint withdrawMetadata = abi.encode(recipient, relayer, fee).snarkHash();
        if (!
        _verifyWithdrawFromSubsetProof(
            flatProof,
            root,
            subsetRoot,
            nullifier,
            assetMetadata,
            withdrawMetadata
        )
       ) {
            revert InvalidZKProof();
        }
        nullifiers[nullifier] = true;

//    (bool success_s,) = payable(recipient).call{value : amount}("");
               
        return true;
    }
}