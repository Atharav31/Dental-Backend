const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://atharavuttekar3124:Bu5PmGibTX1nOyNG@dentalcluster.w6ayx.mongodb.net/"
    );
    console.log(`MongoDB connected`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
connectDB();

module.exports = connectDB;
