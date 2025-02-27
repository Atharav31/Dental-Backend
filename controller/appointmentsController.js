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
    // sendSMS(phoneNo, appointmentCreatedMessage(appointmentForPatient));
    res.status(201).json(appointmentForPatient);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getAppointment = async (req, res) => {
  try {
    const {
      date,
      treatment,
      status,
      page = 1,
      limit = 1,
      phoneNo,
      time,
      id,
    } = req.query;

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
    if (time) {
      filter.time = time;
    }
    if (id) {
      filter._id = id;
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
      .sort({ createdAt: -1 })
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


exports.updateStatus = async (req, res) => {
  try {
    const { status, appointmentIds } = req.body;
    const allowedStatus = ["pending", "confirmed", "cancelled", "completed"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    if (!Array.isArray(appointmentIds) || appointmentIds.length === 0) {
      return res
        .status(400)
        .json({ message: "appointmentIds must be a non-empty array" });
    }

    const uniqueAppointmentIds = [...new Set(appointmentIds)];

    const appointments = await appointment.find({
      _id: { $in: uniqueAppointmentIds },
    });

    if (appointments.length !== uniqueAppointmentIds.length) {
      return res
        .status(404)
        .json({ message: "One or more appointments not found" });
    }

    const updatedAppointments = await Promise.all(
      appointments.map(async (appt) => {
        appt.status = status;
        return appt.save();
      })
    );

    res.status(200).json({
      message: "Statuses updated successfully",
      count: updatedAppointments.length,
      data: updatedAppointments,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};
exports.updateAppointment = async (req, res) => {
  try {
    const { id } = req.params; // Get appointment ID from request params
    const updateData = req.body; // Data to update

    // Find and update the appointment
    const updatedAppointment = await appointment.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedAppointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

    res.status(200).json({
      success: true,
      message: "Appointment updated successfully",
      data: updatedAppointment,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};



// exports.getAppointmentById = async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     const appointmentDetails = await appointment.findById(id)
//       .populate(
//         "prescriptionId",
//         "medicines instructions proceduresPerformed allergies followUpRequired nextVisit additionalNotes"
//       );
    
//     if (!appointmentDetails) {
//       return res.status(404).json({
//         success: false,
//         message: "Appointment not found"
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: appointmentDetails
//     });
//   } catch (err) {
//     console.error(err.message);
//     // Handle invalid MongoDB ID format
//     if (err.kind === 'ObjectId') {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid appointment ID format"
//       });
//     }
//     res.status(500).json({ 
//       success: false,
//       message: "Server Error" 
//     });
//   }
// };
// confirm cancel of multiple/Single appointments
