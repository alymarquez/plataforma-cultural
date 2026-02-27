const { Router } = require("express");
const router = Router();
const { bookController } = require("../controllers");

router.get("/search", bookController.searchBooks);

module.exports = router;
