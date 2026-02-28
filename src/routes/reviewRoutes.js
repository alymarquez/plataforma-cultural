const { Router } = require('express');
const router = Router();
const { reviewController } = require("../controllers");
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, reviewController.createReview);

module.exports = router;