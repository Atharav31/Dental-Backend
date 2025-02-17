const appointment = require("../models/appointment");
const Prescription = require("../models/Prescription");

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
    const { appointmentId } = req.params;
    const prescription = await Prescription.findById(appointmentId);
  } catch (error) {
    console.error(
      "Error getting prescription by appointment id:",
      error.message
    );
    res.status(500).json({ message: "Server Error" });
  }
};
