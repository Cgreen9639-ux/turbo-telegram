// Central export for exchange services
const binance = require('./binanceService');
const coinbase = require('./coinbaseService');
const kraken = require('./krakenService');

module.exports = { binance, coinbase, kraken };