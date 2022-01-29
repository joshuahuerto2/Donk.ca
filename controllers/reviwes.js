const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Review = require("../models/review");
const User = require("../models/user");
const mongoose = require("mongoose");

//@desc    Get review
//@route   Get /api/v1/review/:id
//@access  Public
exports.getReviewById = asyncHandler(async (req, res, next) => {
  const item = await Review.find({ userId: req.params.id });

  res.status(200).json({
    success: true,
    data: item,
  });
});

//@desc    Delete review
//@route   DELETE /api/v1/review/:id
//@access  Private
exports.deleteReivewById = asyncHandler(async (req, res, next) => {
  const item = await Review.findById(req.params.id);
  const ownerId = req.user._id;

  if (!item) {
    res.status(404).json({
      success: false,
      data: `Resource not found`,
    });
  }

  if (ownerId.toString() !== item.senderId.toString()) {
    res.status(403).json({
      success: false,
      data: `Error`,
    });
  }

  res.status(200).json({
    success: true,
    data: "Item removed",
  });
});

//@desc    Create review
//@route   Post /api/v1/review
//@access  Private
exports.createReview = asyncHandler(async (req, res, next) => {
  req.body.senderId = req.user._id;
  console.log(req.body);
  if (req.body.userId === req.body.senderId.toString()) {
    res.status(400).json({
      success: false,
      data: `Error`,
    });
  }
  const user = User.findById(req.body.userId);
  if (!user) {
    res.status(404).json({
      success: false,
      data: `User not found`,
    });
  }

  const item = await Review.findOne({
    senderId: req.user._id,
    userId: mongoose.Types.ObjectId(req.body.userId),
  });
  if (item) {
    res.status(400).json({
      success: false,
      data: `Error`,
    });
  } else {
    const result = await Review.create(req.body);
    res.status(200).json({ success: true, data: result });
  }
});
