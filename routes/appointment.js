const express = require("express");
const appointmentRouter = express.Router();
const Appointment = require("../models/appointment");
const {
  createAppointment,
  prescription,
  getAppointment,
  updateStatus,
} = require("../controller/appointmentsController");


appointmentRouter.post("/appointments", createAppointment);
appointmentRouter.get("/appointments", getAppointment);
appointmentRouter.put("/appointments", updateStatus);

module.exports = appointmentRouter;
