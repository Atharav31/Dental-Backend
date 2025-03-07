const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
   prescriptionId: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "Prescription",
   },
    appointmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
    },
    report: {
        type: String,
        default: "",
        required: true,
    },
    });

module.exports = mongoose.model("Report", reportSchema);