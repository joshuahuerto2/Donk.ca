const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    trim: true,
    maxlength: [69, "Name can not be more than 69 characters"],
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  accountBiography: {
    type: String,
    default: "",
  },
  cardCareNumber: {
    type: Number,
    default: 0,
  },
  address: {
    street: String,
    city: String,
    zipcode: String,
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Plesae add a password"],
    minlength: 6,
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    unique: false,
    required: false,
  },
});

//Encrypt password using bcrypt
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  // this.password = await bcrypt.hashSync(this.password, process.env.SECRET_KEY);
  this.password = bcrypt.hashSync(this.password, process.env.SECRET_KEY);
});

//Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

UserSchema.methods.matchPassword = function (enteredPassword) {
  const hash = bcrypt.hashSync(enteredPassword, process.env.SECRET_KEY);
  return this.password === hash;
};

module.exports = mongoose.model("User", UserSchema);
