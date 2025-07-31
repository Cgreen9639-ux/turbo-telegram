// Placeholder Kraken integration
const axios = require('axios');

exports.getTicker = async (pair = 'XBTUSD') => {
  const url = 'https://api.kraken.com/0/public/Ticker?pair=' + pair;
  const resp = await axios.get(url);
  return resp.data;
};