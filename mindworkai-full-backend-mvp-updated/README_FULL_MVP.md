# MindWorkAI Full Backend MVP Patch (Updated Dashboard & Auth)

This patch delivers a **runnable minimal MVP** covering your core three parts, now with an improved dashboard and ensured functional login/signup:
1. **Authentication** — JWT signup/login with persisted SQLite user store. Fully operational.  
2. **Dashboard** — Aggregates live prices from multiple sources (Binance, Coinbase, Kraken) for BTC and ETH, combines with user holdings to compute portfolio, and includes on-chain ETH balance. You can pass custom holdings via query param.  
3. **Multi-Exchange + Trading + Web3** —
   - Public Binance, Coinbase, Kraken price fetch.  
   - Binance **testnet** private endpoints: account info and order placement (signed).  
   - Web3 ETH balance via ethers.js.

## Added Core Files
- `server.js` — Entry point wiring all routes.  
- `utils/db.js` — SQLite user table.  
- `auth/` — JWT-based authentication.  
- `controllers/dashboardController.js` — Enhanced portfolio + price aggregation.  
- `services/exchanges/binancePrivateService.js` — Signed Binance testnet trading.  
- `routes/exchangeRoutes.js` — Public + private exchange endpoints.  

## Environment (.env)
Create a `.env` file with:
```
JWT_SECRET=your_jwt_secret
BINANCE_API_KEY=your_testnet_api_key
BINANCE_SECRET=your_testnet_secret
BINANCE_BASE_URL=https://testnet.binance.vision
```

## Install
```bash
npm install express better-sqlite3 bcryptjs jsonwebtoken axios ethers dotenv
```

## Run
```bash
node server.js
```

## Dashboard Overview Endpoint
`GET /api/dashboard/overview`  
Headers: `Authorization: Bearer <token>`  
Query params (optional):  
- `ethAddress` – on-chain wallet to include balance for.  
- `holdings` – JSON string, e.g. `?holdings=[{"symbol":"BTC","amount":0.1},{"symbol":"ETH","amount":2}]`

Example response includes portfolio breakdown, current prices, wallet balance, and total value.

## Basic Flow
1. `POST /api/auth/signup` → `{ "email":"me@example.com","password":"pass123" }`  
2. `POST /api/auth/login` → receives JWT  
3. Use `Authorization: Bearer <token>` header to access protected:  
   - `GET /api/dashboard/overview?ethAddress=0x...&holdings=[{"symbol":"BTC","amount":0.1}]`  
   - `GET /api/exchange/binance/ticker/BTCUSDT`  
   - `GET /api/exchange/binance/account` (testnet signed account info)  
   - `POST /api/exchange/binance/order` with JSON body `{ "symbol":"BTCUSDT","side":"BUY","type":"MARKET","quantity":"0.001" }`  

## Notes
- Replace placeholder RPC provider in `services/web3/walletService.js` with a real one if needed.  
- Binance private endpoints use testnet; ensure your API key/secret are from the testnet environment.  
- This is intentionally minimal; you can extend to real trading, more exchanges, and frontend integration next.
