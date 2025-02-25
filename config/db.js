const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://dentalBackend:6f6dUd2mDUmNXxIX@cluster0.c09n2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log(`MongoDB connected`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
connectDB();

module.exports = connectDB;
