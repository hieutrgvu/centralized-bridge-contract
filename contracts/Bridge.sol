// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./IMintableBurnableToken.sol";

contract Bridge is Ownable {
    IMintableBurnableToken public token;
    mapping(uint256 => mapping(bytes32 => bool)) processedChainTxns;

    event Transfer(address from, address to, uint256 amount, uint256 toChainId);
    event Mint(address from, address to, uint256 amount, uint256 fromChainId, bytes32 fromChainTxn);

    constructor(address _token) {
        token = IMintableBurnableToken(_token);
    }

    function transferTo(address to, uint256 amount, uint256 chainId) external {
        require(chainId != block.chainid, "cannot bridge to the same chain");
        token.burn(msg.sender, amount);
        emit Transfer(msg.sender, to, amount, chainId);
    }

    function mint(address to, uint256 amount, uint256 fromChainID, bytes32 fromChainTxn) external onlyOwner {
        require(processedChainTxns[fromChainID][fromChainTxn] == false, "transfer already processed");
        processedChainTxns[fromChainID][fromChainTxn] = true;
        token.mint(to, amount);
        emit Mint(msg.sender, to, amount, fromChainID, fromChainTxn);
    }
}
