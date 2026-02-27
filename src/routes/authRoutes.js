const { Router } = require('express');
const router = Router();
const { authController } = require("../controllers");
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/profile', authMiddleware, authController.getProfile)

module.exports = router;