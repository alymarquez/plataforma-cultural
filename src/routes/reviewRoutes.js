const { Router } = require('express');
const router = Router();
const { reviewController } = require("../controllers");

router.post('/'/*, authMiddleware*/, reviewController.createReview);

module.exports = router;