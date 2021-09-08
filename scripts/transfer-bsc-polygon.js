const { ethers } = require('ethers');
const { addresses } = require('./config.json')

async function start() {
    const privateKey = process.argv[2]
    let wallet = new ethers.Wallet(privateKey)
    console.log('signer:', wallet.address)

    const provider = new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545');
    wallet = wallet.connect(provider);

    const tokenAbi = [
        "function balanceOf(address) view returns (uint)"
    ];
    let token = new ethers.Contract(addresses.bsc.token, tokenAbi, provider);
    token = token.connect(wallet);
    balance = await token.balanceOf(wallet.address);
    console.log('balance:', ethers.utils.formatUnits(balance, 18))

    const bridgeAbi = [
        'function transferTo(address to, uint256 amount, uint256 chainId)'
    ]
    let bridge = new ethers.Contract(addresses.bsc.bridge, bridgeAbi, provider);
    bridge = bridge.connect(wallet);
    tx = await bridge.transferTo(wallet.address, ethers.utils.parseEther('0.1'), 80001);
    console.log('bridge 0.1 token to polygon, tx:', tx.hash);
};

start();
