const { generateToken } = require('./tokenUtils');
const bcrypt = require('bcryptjs');
const db = require('../utils/db');

exports.signup = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  const existing = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (existing) return res.status(400).json({ error: 'User exists' });
  const hash = await bcrypt.hash(password, 10);
  db.prepare('INSERT INTO users (email, password) VALUES (?, ?)').run(email, hash);
  const token = generateToken({ email });
  res.json({ token, user: { email } });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: 'Invalid credentials' });
  const token = generateToken({ email });
  res.json({ token, user: { email } });
};
