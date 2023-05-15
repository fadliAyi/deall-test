const authService = require('../services/jwtAuthService');

module.exports = async (req, res, next) => {
  const authHeader = (req.headers.authorization || '').split(' ').pop();

  const ctx = req.ctx;

  if(!authHeader) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const result = await authService.validateToken(authHeader);

  if(!result.status) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  ctx.set('user', result.data);
  ctx.set('token', authHeader);

  next();
};