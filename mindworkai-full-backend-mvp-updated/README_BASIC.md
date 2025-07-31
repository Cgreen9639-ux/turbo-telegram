# MindWorkAI Basic Backend Patch

This patch provides a **minimal working backend** for:

1. JWT Authentication (signup/login)
2. Protected dashboard endpoint with live Binance BTC price + ETH wallet balance
3. Basic multi-exchange (Binance only) + Web3 support

## Folder Overview
- auth/ – Signup/Login + JWT handling
- routes/ – Auth, dashboard, and exchange routes
- controllers/ – Dashboard aggregation logic
- services/exchanges/ – Binance public price fetch
- services/web3/ – ETH balance via ethers.js
- utils/db.js – SQLite-based local user store

## Quick Start
1. Copy folders into your backend project
2. Install dependencies:
   ```bash
   npm install express better-sqlite3 bcryptjs jsonwebtoken axios ethers dotenv
   ```
3. Create a `.env` file:
   ```
   JWT_SECRET=your_super_secret_key
   ```
4. Launch Express server (ensure app.js / server.js uses routes):
   ```js
   const express = require('express');
   const app = express();
   require('dotenv').config();
   app.use(express.json());
   app.use('/api/auth', require('./routes/authRoutes'));
   app.use('/api/dashboard', require('./routes/dashboardRoutes'));
   app.use('/api/exchange', require('./routes/exchangeRoutes'));
   app.listen(3000, () => console.log('Server running'));
   ```

## Test Flow
1. Signup → `POST /api/auth/signup` `{ "email":"me@example.com","password":"pass123" }`
2. Login → `POST /api/auth/login` → get JWT
3. Dashboard → `GET /api/dashboard/overview?ethAddress=0xYourEthAddr` (Bearer token required)
4. Binance Price → `GET /api/exchange/binance/ticker/BTCUSDT` (Bearer token required)

Replace Infura RPC in `services/web3/walletService.js` with your provider URL.
