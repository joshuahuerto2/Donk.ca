const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");

//@desc    Get current looged in user
//@route   Get /api/v1/auth/
//@access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

//@desc    Register user
//@route   Post /api/v1/auth/register
//@access  Public
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { name, phoneNumber, address, email, password } = req.body;

  // Craete user
  const username = uuidv4();
  console.log(username);
  try {
    const user = await User.create({
      name,
      phoneNumber,
      address,
      email,
      password,
      username,
    });
    sendTokenRosponse(user, 200, res);
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, data: error });
  }
});

//@desc    Login user
//@route   POST /api/v1/auth/login
//@access  Public
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res
      .status(400)
      .json({ success: false, data: "Please provid an email and password" });
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    res.status(401).json({ success: false, data: "Invalid credentials" });
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return res
      .status(401)
      .json({ success: false, data: "Invalid credentials" });
  }

  sendTokenRosponse(user, 200, res);
});

const sendTokenRosponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  const options = {};

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    data: token,
  });
};

//@desc    Get current looged in user
//@route   GET /api/v1/auth/logout
//@access  Prive
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 2 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: {},
  });
});
