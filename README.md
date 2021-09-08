# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

# Deploy
```shell
npm run deploy:testnet:bsc
npm run deploy:testnet:polygon
```

# Demo
1. Edit contract addresses in `scripts/config.json` and deployer's mnemonic in `secrets.json`

2. Mint some tokens to an address
```shell
npm install
node scripts/mint-token.js <receiver-address>
```

3. Bridge from Polygon to BSC
```shell
node scripts/transfer-polygon-bsc.js <sender-private-key>
```

4. Bridge from BSC to Polygon
```shell
node scripts/transfer-bsc-polygon.js <sender-private-key>
```

# Contracts

## BSC
```
Token deployed to: 0x1EA55E6b663E63f5e1f635246BB263e5ADdA5976
Bridge deployed to: 0x56d4c1A6E6A6De3778476A7c1ABE132a2fE8BE36
```

## Polygon
```
Token deployed to: 0x50b6D802f32fF8021A75b491EE638C475Ce832f1
Bridge deployed to: 0xD0deE265E191491dc544D24242E95EC563eB3F06
```
