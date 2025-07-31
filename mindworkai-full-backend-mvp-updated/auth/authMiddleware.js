const { verifyToken } = require('./tokenUtils');

module.exports = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'No token' });
  const parts = auth.split(' ');
  if (parts.length !==2 || parts[0] !== 'Bearer') return res.status(401).json({ error: 'Malformed token' });
  try {
    const payload = verifyToken(parts[1]);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};