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

exports.loginAdmin = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const userAuthenticate = password === "admin1234" && userName === "admin";
    if (userAuthenticate) {
      res.status(200).json({
        message: "Login Successfull",
        isLoggedIn: true,
      });
    }
    res.status(401).json({
      message: "Login Failed",
      isLoggedIn: false,
    });
  } catch (error) {
    console.error("Error updating prescription:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
