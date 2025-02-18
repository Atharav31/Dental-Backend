const express = require("express");
const { prescription, updatePrescription, getPrescriptionByAppointmentId } = require("../controller/prescriptionController");
const prescriptionRouter = express.Router();

prescriptionRouter.post("/prescription", prescription);
prescriptionRouter.get("/prescription", getPrescriptionByAppointmentId);
prescriptionRouter.patch("/prescription/:prescriptionId", updatePrescription);

module.exports = prescriptionRouter;
