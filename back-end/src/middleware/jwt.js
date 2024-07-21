const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = require('../configs/JWTSecretKey.js');


const generateToken = (userId, roleId) => {
  // return jwt.sign({ id: userId, role: roleId }, JWT_SECRET_KEY, { expiresIn: '20s' });
  return jwt.sign({ id: userId, role: roleId }, JWT_SECRET_KEY, { expiresIn: '15m' });
};


const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send('Invalid token.');
  }
};


const authorizeRole = (requiredRole) => {
  return (req, res, next) => {
    if (req.user.role !== requiredRole) {
      return res.status(403).send('Access denied. Insufficient permissions.');
    }
    next();
  };
};


module.exports = {
  generateToken,
  verifyToken,
  authorizeRole
};
