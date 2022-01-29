const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");

const { getUserById, updateUser } = require("../controllers/users");

router.get("/:id", getUserById);
router.put("/", protect, updateUser);

module.exports = router;
