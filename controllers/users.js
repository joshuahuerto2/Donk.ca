const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/user");

//@desc    Get user by id
//@route   Post /api/v1/users/:id
//@access  Public
exports.getUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).select("-cardCareNumber");

  res.status(200).json({ success: true, data: user });
});

//@desc    Update user profile
//@route   Put /api/v1/users/
//@access  Private
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("-cardCareNumber");

  if (!user) {
    res.status(404).json({
      success: false,
      data: `User not found`,
    });
  }

  const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: updatedUser });
});
