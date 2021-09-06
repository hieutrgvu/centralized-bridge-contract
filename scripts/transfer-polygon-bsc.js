const { ethers } = require('ethers');
const { addresses } = require('./config.json')

async function start() {
    const privateKey = process.argv[2]
    let wallet = new ethers.Wallet(privateKey)
    console.log('signer:', wallet.address)

    const provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com');
    wallet = wallet.connect(provider);

    const tokenAbi = [
        "function balanceOf(address) view returns (uint)"
    ];
    let token = new ethers.Contract(addresses.polygon.token, tokenAbi, provider);
    token = token.connect(wallet);
    balance = await token.balanceOf(wallet.address);
    console.log('balance:', ethers.utils.formatUnits(balance, 18))

    const bridgeAbi = [
        'function transferTo(address to, uint256 amount, uint256 chainId)'
    ]
    let bridge = new ethers.Contract(addresses.polygon.bridge, bridgeAbi, provider);
    bridge = bridge.connect(wallet);
    tx = await bridge.transferTo(wallet.address, ethers.utils.parseEther('1.0'), 97);
    console.log('bridge 1 token to bsc, tx:', tx.hash);
};

start();
