require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

// mount routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));
app.use('/api/exchange', require('./routes/exchangeRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
