module.exports = async (req, res, next) => {
  const context = req.ctx;
  const user = context.get('user');

  if (user.role === 'user') {
    next();
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}