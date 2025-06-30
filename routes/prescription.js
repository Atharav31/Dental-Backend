const express = require("express");
const {
  prescription,
  updatePrescription,
  getPrescriptionByAppointmentId,
  loginAdmin,
} = require("../controller/prescriptionController");
const prescriptionRouter = express.Router();

prescriptionRouter.post("/prescription", prescription);
prescriptionRouter.get("/prescription", getPrescriptionByAppointmentId);
prescriptionRouter.patch("/prescription/:prescriptionId", updatePrescription);
prescriptionRouter.post("/login", loginAdmin);

module.exports = prescriptionRouter;
