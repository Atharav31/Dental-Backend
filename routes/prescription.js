const express = require("express");
const { prescription, updatePrescription, getPrescriptionByAppointmentId, createReport, deleteReport } = require("../controller/prescriptionController");
const prescriptionRouter = express.Router();

prescriptionRouter.post("/prescription", prescription);
prescriptionRouter.get("/prescription", getPrescriptionByAppointmentId);
prescriptionRouter.patch("/prescription/:prescriptionId", updatePrescription);
prescriptionRouter.post("/report/:appointmentId", createReport);
prescriptionRouter.post("/reportDelete/:appointmentId", deleteReport);
module.exports = prescriptionRouter;
