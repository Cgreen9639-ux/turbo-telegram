// Utility functions for interacting with smart contracts
const { ethers } = require('ethers');

exports.getContract = (address, abi, providerUrl) => {
  const provider = new ethers.JsonRpcProvider(providerUrl);
  return new ethers.Contract(address, abi, provider);
};