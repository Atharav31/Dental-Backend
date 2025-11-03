const express = require("express");
const { googleReview } = require("../Utility/googleReview");
const googleReviewRouter = express.Router();

googleReviewRouter.get("/", googleReview);

module.exports = googleReviewRouter;
