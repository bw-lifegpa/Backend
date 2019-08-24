const jwt = require('jsonwebtoken');
const config = require('./config');

module.exports = {
  restricted
};

function restricted(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, config.development.JWT_SECRET, (err, decodedToken) => {
      if (err) res.status(401).json({ message: 'Invalid token' });
      else {
        req.user = { username: decodedToken.username };
        next();
      }
    });
  } else res.status(401).json({ message: 'Need Authorization token' });
}
