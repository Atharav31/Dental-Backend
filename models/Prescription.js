// models/Prescription.js
const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
    required: true,
  },
  diagnosis: {
    type: String,
    required: true,
  },
  symptoms: {
    type: [String], // e.g., ["fatigue", "frequent urination"]
    required: true,
  },
  medicines: [
    {
      name: { type: String, required: true },
      dosage: { type: String, required: true },
      frequency: { type: String, required: true },
      duration: { type: String, required: true },
    },
  ],
  instructions: {
    type: [String],
  },
  proceduresPerformed: [
    {
      procedureName: { type: String, required: true },
      notes: { type: String },
    },
  ],
  allergies: {
    type: [String],
    default: [],
  },
  followUpRequired: {
    type: Boolean,
    default: false,
  },
  nextVisit: {
    type: Date,
    required: true,
  },
  additionalNotes: {
    type: String,
  },
});

module.exports = mongoose.model("Prescription", prescriptionSchema);
