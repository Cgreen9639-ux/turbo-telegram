// Placeholder Coinbase integration
const axios = require('axios');

exports.getSpotPrice = async (currency = 'BTC-USD') => {
  const url = `https://api.coinbase.com/v2/prices/${currency}/spot`;
  const resp = await axios.get(url);
  return resp.data;
};