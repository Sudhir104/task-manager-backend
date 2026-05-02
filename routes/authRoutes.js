const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authController");

router.post("/signup", signup);
router.post("/register", signup); // alias
router.post("/login", login);

module.exports = router;