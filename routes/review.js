const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");

const {
  createReview,
  getReviewById,
  deleteReivewById,
} = require("../controllers/reviwes");

router.post("/", protect, createReview);
router.get("/:id", getReviewById);
router.delete("/:id", protect, deleteReivewById);

module.exports = router;
