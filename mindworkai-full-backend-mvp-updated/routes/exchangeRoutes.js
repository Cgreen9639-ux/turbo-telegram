const express = require('express');
const router = express.Router();
const authMiddleware = require('../auth/authMiddleware');
const { binance, coinbase, kraken } = require('../services/exchanges');
const binancePrivate = require('../services/exchanges/binancePrivateService');

// Public price endpoints (require auth for consistency)
router.get('/binance/ticker/:symbol', authMiddleware, async (req, res) => {
  try { 
    const data = await binance.getTicker(req.params.symbol);
    res.json(data);
  } catch (e) { res.status(500).json({error: 'Failed fetching public ticker', details: e.message}); }
});

// Private/testnet endpoints for Binance
router.get('/binance/account', authMiddleware, async (req, res) => {
  try { 
    const data = await binancePrivate.getAccountInfo();
    res.json(data);
  } catch (e) { res.status(500).json({error: 'Failed fetching account info', details: e.message}); }
});

router.post('/binance/order', authMiddleware, async (req, res) => {
  try { 
    const { symbol, side, type, quantity } = req.body;
    if (!symbol || !quantity) return res.status(400).json({ error: 'symbol and quantity required' });
    const data = await binancePrivate.placeTestOrder({ symbol, side, type, quantity });
    res.json(data);
  } catch (e) { res.status(500).json({error: 'Failed placing order', details: e.message}); }
});

router.get('/coinbase/price/:pair', authMiddleware, async (req, res) => {
  try { 
    const data = await coinbase.getSpotPrice(req.params.pair);
    res.json(data);
  } catch (e) { res.status(500).json({error: 'Failed fetching coinbase price', details: e.message}); }
});

router.get('/kraken/ticker/:pair', authMiddleware, async (req, res) => {
  try { 
    const data = await kraken.getTicker(req.params.pair);
    res.json(data);
  } catch (e) { res.status(500).json({error: 'Failed fetching kraken ticker', details: e.message}); }
});

module.exports = router;