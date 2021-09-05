// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import './IMintableBurnableToken.sol';

contract Bridge is Ownable {
  IMintableBurnableToken public token;
  mapping(uint => mapping(bytes32 => bool)) processedChainTxns;

  event Transfer(address from, address to, uint amount, uint toChainId);
  event Mint(address from, address to, uint amount, uint fromChainId, bytes32 fromChainTxn);

  constructor(address _token) {
    token = IMintableBurnableToken(_token);
  }

  function transferTo(address to, uint amount, uint chainId) external {
    require(chainId != block.chainid, 'cannot bridge to the same chain');
    token.burn(msg.sender, amount);
    emit Transfer(msg.sender, to, amount, chainId);
  }

  function mint(address to, uint amount, uint fromChainID, bytes32 fromChainTxn) external onlyOwner {
    require(processedChainTxns[fromChainID][fromChainTxn] == false, 'transfer already processed');
    processedChainTxns[fromChainID][fromChainTxn] = true;
    token.mint(to, amount);
    emit Mint(msg.sender, to, amount, fromChainID, fromChainTxn);
  }
}
