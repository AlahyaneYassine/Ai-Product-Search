// middleware/authenticate.js
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // "Bearer <token>"
  if (!token) return res.status(401).json({ msg: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET || 'fallbacksecret', (err, decoded) => {
     if (err) {
      console.log('JWT verify error:', err.message); // <--- log error
      return res.status(403).json({ msg: 'Invalid token' });
    }
    req.userId = decoded.userId;
    next();
  });
};

module.exports = authenticate;
