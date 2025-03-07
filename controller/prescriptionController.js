const appointment = require("../models/appointment");
const Prescription = require("../models/Prescription");
const reports = require("../models/reports");

exports.prescription = async (req, res) => {
  try {
    const {
      appointmentId,
      medicines,
      instructions,
      proceduresPerformed,
      allergies,
      followUpRequired,
      nextVisit,
      additionalNotes,
    } = req.body;

    const appointmentToAddPrescription = await appointment.findById(
      appointmentId
    );

    if (!appointmentToAddPrescription) {
      throw new Error("Appointment not found");
    }
    const prescription = new Prescription({
      appointmentId,
      medicines,
      instructions,
      proceduresPerformed,
      allergies,
      followUpRequired,
      nextVisit,
      additionalNotes,
    });

    const savedPrescription = await prescription.save();

    //now saving prescription to appointment

    appointmentToAddPrescription.prescriptionId = savedPrescription._id;
    await appointmentToAddPrescription.save();

    res.status(201).json(savedPrescription);
  } catch (err) {
    console.error("Error saving prescription:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getPrescriptionByAppointmentId = async (req, res) => {
  try {
    const { appointmentId } = req.query;
    console.log(appointmentId);
    const prescription = await Prescription.find({ appointmentId });

    res.status(200).json(prescription);
  } catch (error) {
    console.error(
      "Error getting prescription by appointment id:",
      error.message
    );
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updatePrescription = async (req, res) => {
  try {
    const { prescriptionId } = req.params;
    const updatedPrescription = await Prescription.findByIdAndUpdate(
      prescriptionId,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedPrescription);
  } catch (error) {
    console.error("Error updating prescription:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};


exports.createReport = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { prescriptionId, report } = req.body;

    const newReport = new reports({
      appointmentId,
      prescriptionId,
      report,
    });

    const savedReport = await newReport.save();
console.log(savedReport._id.toString());
const stringReportId = savedReport._id.toString();
    const updatedAppointment = await appointment.findByIdAndUpdate(
      appointmentId,
      { $push: { reportIds: stringReportId } },
      { new: true }
    );

    res.status(201).json(updatedAppointment);
  } catch (error) {
    console.error("Error creating report:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
exports.deleteReport = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { reportIds } = req.body; // Expecting an array of report IDs

    const updatedAppointment = await appointment.findByIdAndUpdate(
      appointmentId,
      { $pull: { reportIds: { $in: reportIds } } },
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json(updatedAppointment);
  } catch (error) {
    console.error("Error deleting reports:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

