const express = require("express");
const { dashboardData } = require("../controller/dashboardController");
const dashboardRouter = express.Router();

dashboardRouter.get("/dashboard", dashboardData);
module.exports = dashboardRouter;
