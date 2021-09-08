const { mnemonic } = require('../secrets.json');
const { ethers } = require('ethers');
const { addresses } = require('./config.json')

async function start() {
    const receiver = process.argv[2]
    console.log('receiver:', receiver)

    let wallet = ethers.Wallet.fromMnemonic(mnemonic)
    console.log('signer:', wallet.address)

    const provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.matic.today');
    wallet = wallet.connect(provider);

    const tokenAbi = [
        'function mint(address to, uint256 amount)'
    ];
    let token = new ethers.Contract(addresses.polygon.token, tokenAbi, provider);
    token = token.connect(wallet);
    await token.mint(receiver, ethers.utils.parseEther('5.0'));
    console.log('5.0 tokens sent')
};

start();
