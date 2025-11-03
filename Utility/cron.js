// cron/scheduler.js
const cron = require("node-cron");
const fetchAndStoreGoogleReviews = require("./fetchAndStoreGoogleReviews");

// Run every day at 1 AM
cron.schedule("0 1 * * *", () => {
  console.log("⏰ Cron job running...");
  fetchAndStoreGoogleReviews();
});
