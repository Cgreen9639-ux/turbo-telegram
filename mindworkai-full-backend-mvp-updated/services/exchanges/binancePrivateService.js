/**
 * Binance testnet/private endpoint integration with HMAC signing.
 * Requires environment variables: BINANCE_API_KEY, BINANCE_SECRET, BINANCE_BASE_URL (for testnet, e.g., https://testnet.binance.vision)
 */
const axios = require('axios');
const crypto = require('crypto');

const BASE_URL = process.env.BINANCE_BASE_URL || 'https://testnet.binance.vision';
const API_KEY = process.env.BINANCE_API_KEY || '';
const SECRET = process.env.BINANCE_SECRET || '';

// Helper to sign query string
function sign(queryString) {
  return crypto.createHmac('sha256', SECRET).update(queryString).digest('hex');
}

async function getAccountInfo() {
  const timestamp = Date.now();
  let query = `timestamp=${timestamp}`;
  const signature = sign(query);
  const url = `${BASE_URL}/api/v3/account?${query}&signature=${signature}`;
  const headers = { 'X-MBX-APIKEY': API_KEY };
  const resp = await axios.get(url, { headers });
  return resp.data;
}

async function placeTestOrder({ symbol, side = 'BUY', type = 'MARKET', quantity }) {
  const timestamp = Date.now();
  let query = `symbol=${symbol}&side=${side}&type=${type}&quantity=${quantity}&timestamp=${timestamp}`;
  const signature = sign(query);
  const url = `${BASE_URL}/api/v3/order?${query}&signature=${signature}`;
  const headers = { 'X-MBX-APIKEY': API_KEY };
  const resp = await axios.post(url, null, { headers });
  return resp.data;
}

module.exports = {
  getAccountInfo,
  placeTestOrder
};