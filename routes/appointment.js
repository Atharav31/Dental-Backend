const express = require("express");
const appointmentRouter = express.Router();
const Appointment = require("../models/appointment");
const {
  createAppointment,
  prescription,
  getAppointment,
} = require("../controller/appointmentsController");

// Create a new appointment

appointmentRouter.post("/appointments", createAppointment);
appointmentRouter.get("/appointments", getAppointment);

module.exports = appointmentRouter;
// Get all appointments
