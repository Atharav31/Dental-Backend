// cron/googleReviewCron.js
const axios = require("axios");
const GoogleReview = require("../models/GoogleReview");

async function fetchAndStoreGoogleReviews() {
  const placeId = "ChIJHy61w924wjsRrcnLR19k75w";
  const apiKey = "AIzaSyCSBvl_Kb8fI3i1gJCDWuo0JqTo0dqU0fM";

  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/place/details/json",
      {
        params: {
          place_id: placeId,
          fields: "name,rating,reviews,formatted_address",
          key: apiKey,
        },
      }
    );

    const reviews = response.data.result.reviews;

    // Remove old reviews if needed
    await GoogleReview.deleteMany({});

    // Save new reviews
    const formatted = reviews.map((r) => ({
      author_name: r.author_name,
      rating: r.rating,
      text: r.text,
      time: new Date(r.time * 1000), // Convert from Unix
      profile_photo_url: r.profile_photo_url,
    }));

    await GoogleReview.insertMany(formatted);
    console.log("✅ Google reviews updated at", new Date().toISOString());
  } catch (err) {
    console.error("❌ Failed to fetch or store reviews:", err.message);
  }
}

module.exports = fetchAndStoreGoogleReviews;
