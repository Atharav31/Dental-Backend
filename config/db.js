const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB connected`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
connectDB();

module.exports = connectDB;
