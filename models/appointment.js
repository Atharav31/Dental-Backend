const mongoose = require("mongoose");
const moment = require("moment");

const appointmentSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    phoneNo: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 10,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"], // status can be pending, confirmed, or cancelled
      default: "pending",
    },
    date: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return (
            moment(value, "DD/MM/YYYY", true).isValid() &&
            moment(value, "DD/MM/YYYY").isSameOrAfter(moment().startOf("day"))
          );
        },
        message:
          "Date must be in 'DD/MM/YYYY' format and today or in the future.",
      },
    },
    time: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return /^([01]?[0-9]|2[0-3])$/.test(value);
        },
        message: "Time must be in 'HH' format (24-hour clock).",
      },
    },
    treatment: {
      type: String,
      enum: ["oral", "dental", "orthodontic", "orthopedic"],
      required: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 200,
    },
    prescriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Prescription",
      default: null,
    },
  },
  { timestamps: true }
);

// Adding indexes for better query performance
appointmentSchema.index({ date: 1, time: 1 }); // as no unique value here

module.exports = mongoose.model("Appointment", appointmentSchema);
