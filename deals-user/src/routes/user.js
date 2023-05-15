const router = require('express').Router();
const authMiddleware = require('../middleware/auth');
const isRoleAdmin = require('../middleware/isRoleAdmin');
const isRoleUser = require('../middleware/isRoleUser');
const userController = require('../controller/userController');

router.post('/', [authMiddleware, isRoleAdmin], userController.create);
router.get('/:id', [authMiddleware], userController.detail);
router.get('/', [authMiddleware, isRoleAdmin], userController.list);
router.put('/:id', [authMiddleware, isRoleAdmin], userController.update);
router.delete('/:id', [authMiddleware, isRoleAdmin], userController.destroy);

module.exports = router