const router = require('express').Router();
const userRoute = require('./user');

router.get('/health', (req, res) => res.status(200).json({
  message: 'all good',
  date: new Date(),
}));
router.use('/user', userRoute);
module.exports = router;