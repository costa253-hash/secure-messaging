const { verifyToken } = require('../utils/jwt');

function authenticate(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const decoded = verifyToken(token);
  
  if (!decoded) {
    return res.status(403).json({ message: 'Invalid token' });
  }

  req.userId = decoded.userId;
  next();
}

module.exports = authenticate;
