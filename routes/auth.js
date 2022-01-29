const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");

const {
  registerUser,
  loginUser,
  logout,
  getMe,
} = require("../controllers/auth");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/", protect, getMe);

module.exports = router;
