const hre = require("hardhat");
const keccak256 = require('keccak256')

async function main() {
  const Token = await hre.ethers.getContractFactory("TokenPolygon");
  const token = await Token.deploy();
  await token.deployed();

  const Bridge = await hre.ethers.getContractFactory("Bridge");
  const bridge = await Bridge.deploy(token.address);

  await token.grantRole(keccak256('MINTER_BURNER_ROLE'), bridge.address);

  console.log("Token deployed to:", token.address);
  console.log("Bridge deployed to:", bridge.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
