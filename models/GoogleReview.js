// models/Review.js
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  author_name: String,
  rating: Number,
  text: String,
  time: Date,
  profile_photo_url: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Review", reviewSchema);
