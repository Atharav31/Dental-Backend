// const mongoose = require("mongoose");
// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(
//       "mongodb+srv://Company:5xrukdiE9NHWqe3E@dentalcluster.3zzmj.mongodb.net/?retryWrites=true&w=majority&appName=DentalCluster",
//       { dbName: "dental" }
//     );
//     console.log(`MongoDB connected`);
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// };
// connectDB();

// module.exports = connectDB;

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/dentalcare");
    console.log(`✅ MongoDB connected`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

connectDB();
module.exports = connectDB;
