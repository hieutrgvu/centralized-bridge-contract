const { expect } = require("chai");
const { ethers } = require("hardhat");
const hre = require("hardhat");
const keccak256 = require('keccak256');

describe("Bridge", function () {
  it("Should runnable", async function () {
    // deploy
    const Token = await hre.ethers.getContractFactory("TokenBsc");
    const token = await Token.deploy();
    await token.deployed();

    const Bridge = await hre.ethers.getContractFactory("Bridge");
    const bridge = await Bridge.deploy(token.address);

    await token.grantRole(keccak256('MINTER_BURNER_ROLE'), bridge.address);
  
    console.log("Token deployed to:", token.address);
    console.log("Bridge deployed to:", bridge.address);

    // mint token
    let receiver = ethers.Wallet.createRandom()
    console.log('receiver:', receiver.address)
    await token.mint(receiver.address, ethers.utils.parseEther('5.0'));
    balance = await token.balanceOf(receiver.address);
    console.log('receiver balance:', ethers.utils.formatUnits(balance, 18))
    expect('5.0').to.equal(ethers.utils.formatUnits(balance, 18));
  });
});
