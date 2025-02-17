const appointment = require("../models/appointment");
const Prescription = require("../models/Prescription");
const User = require("../models/User");

exports.createAppointment = async (req, res) => {
  try {
    const appointmentForPatient = new appointment(req.body);
    const { phoneNo } = req.body;

    let user = await User.findOne({ phoneNo });

    if (!user) {
      user = new User({ phoneNo, appointments: [appointmentForPatient._id] });
      await user.save();
    } else {
      user.appointments.push(appointmentForPatient._id);
      await user.save();
    }

    await appointmentForPatient.save();
    res.status(201).json(appointmentForPatient);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};
exports.prescription = async (req, res) => {
  try {
    const prescription = new Prescription(req.body);
    await prescription.save();
    res.status(201).json(prescription);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};
