const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Plase add a name"],
    trim: true,
    maxlength: [69, "Name can not be more than 69 characters"],
  },
  description: {
    type: String,
    required: [true, "Plase add a description"],
    maxlength: [200, "Description can not be more than 200 characters"],
  },
  user: {
    type: String,
  },
  category: { type: String, required: true },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    city: { type: String, require: true },
    zipcode: { type: String, require: true },
  },
  photos: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model("Item", ItemSchema);
