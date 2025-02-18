const appointment = require("../models/appointment");
const Prescription = require("../models/Prescription");
const User = require("../models/User");
const { appointmentCreatedMessage } = require("../Templates/smsTemplates");
const { sendSMS } = require("../Utility/smsUtility");

exports.createAppointment = async (req, res) => {
  try {
    const appointmentForPatient = new appointment(req.body);
    const { phoneNo } = req.body;

    let user = await User.findOne({ phoneNo });

    if (!user) {
      user = new User({ phoneNo, appointments: [appointmentForPatient._id] });
      await user.save();
    } else {
      user.appointments.push(appointmentForPatient._id); //TODO:pop it on cancel appointment
      await user.save();
    }

    await appointmentForPatient.save();
    //TODO: send sms to patient
    sendSMS(phoneNo,appointmentCreatedMessage(appointmentForPatient));
    res.status(201).json(appointmentForPatient);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getAppointment = async (req, res) => {
  try {
    const { date, treatment, status, page = 1, limit = 1 ,phoneNo} = req.query;

    let filter = {};

    if (date) {
      filter.date = date;
    }
    if (treatment) {
      filter.treatment = treatment;
    }
    if (status) {
      filter.status = status;
    }
    if (phoneNo) {
      filter.phoneNo = phoneNo;
    }

    // Convert page & limit to numbers
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    // Fetch appointments with filters, pagination, and sorting
    const appointments = await appointment
      .find(filter)
      .populate(
        "prescriptionId",
        "medicines instructions proceduresPerformed allergies followUpRequired nextVisit additionalNotes"
      )
      .sort({ date: 1, time: 1 })
      .skip(skip)
      .limit(limitNumber);

    // Get total count for pagination meta info
    const totalAppointments = await appointment.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: appointments.length,
      totalAppointments,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalAppointments / limitNumber),
      data: appointments,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};
