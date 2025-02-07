const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    date: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value >= new Date().setHours(0, 0, 0, 0); // Ensures date is today or later
        },
        message: "Date must be today or in the future.",
      },
    },
    time: {
      type: String,
      required: true,
    },
    doctorName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
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
  },
  { timestamps: true }
);

// Adding indexes for better query performance
appointmentSchema.index({ date: 1, time: 1 });

module.exports = mongoose.model("Appointment", appointmentSchema);
