
module.exports = async (req, res, next) => {
  const {ctx} = req;
  const user = ctx.get('user');

  if (user.role === 'admin') {
    next();
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}