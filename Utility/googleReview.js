const axios = require("axios");

// exports.googleReview = async (req, res) => {
//   const placeId = "ChIJHy61w924wjsRrcnLR19k75w";
//   const apiKey = "AIzaSyCSBvl_Kb8fI3i1gJCDWuo0JqTo0dqU0fM";

exports.googleReview = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ time: -1 });
    res.json({ reviews });
  } catch (error) {
    console.error("Error fetching reviews from DB:", error.message);
    res.status(500).send("Error fetching reviews from database");
  }
};
