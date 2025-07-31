// Web3 wallet helpers using ethers.js
const { ethers } = require('ethers');

exports.getBalance = async (address, providerUrl = 'https://mainnet.infura.io/v3/YOUR_PROJECT_ID') => {
  const provider = new ethers.JsonRpcProvider(providerUrl);
  const balance = await provider.getBalance(address);
  return ethers.formatEther(balance);
};