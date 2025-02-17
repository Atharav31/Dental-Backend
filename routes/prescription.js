const express = require("express");
const { prescription } = require("../controller/prescriptionController");
const prescriptionRouter = express.Router();

prescriptionRouter.post("/prescription", prescription);

module.exports = prescriptionRouter;
