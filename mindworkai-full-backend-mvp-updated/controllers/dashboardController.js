// Dashboard controller: aggregates crypto trading & investing info
const { binance } = require('../services/exchanges');
const { getBalance } = require('../services/web3/walletService');

// Dummy user holdings for demonstration; replace with DB-driven holdings
// e.g., fetch from user_portfolio table in production
const dummyHoldings = [
  { symbol: 'BTC', amount: 0.1 },
  { symbol: 'ETH', amount: 2 }
];

exports.getOverview = async (req, res) => {
  try {
    const ethAddress = req.query.ethAddress || '0x0000000000000000000000000000000000000000';
    
    // fetch live prices (BTC & ETH) from Binance
    const [btcPriceData, ethPriceData, ethBalance] = await Promise.all([
      binance.getTicker('BTCUSDT'),
      binance.getTicker('ETHUSDT'),
      getBalance(ethAddress)
    ]);

    const prices = {
      BTC: parseFloat(btcPriceData.price || btcPriceData?.price || 0),
      ETH: parseFloat(ethPriceData.price || ethPriceData?.price || 0)
    };

    // Map holdings to portfolio summary
    const portfolio = dummyHoldings.map(h => ({
      symbol: h.symbol,
      amount: h.amount,
      price: prices[h.symbol] || 0,
      value: (prices[h.symbol] || 0) * h.amount
    }));
    const totalValue = portfolio.reduce((sum, p) => sum + p.value, 0);

    res.json({
      user: req.user || null,
      wallet: { ethBalance },
      portfolio,
      totalValue
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to assemble overview', details: e.message });
  }
};
