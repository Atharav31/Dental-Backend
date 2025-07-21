const appointment = require("../models/appointment");
const Bill = require("../models/Bill");

exports.billController = async (req, res) => {
  try {
    const {
      appointmentId,
      page = 1,
      limit = 1,
      paymentMethod,
      userId,
    } = req.query;
    let filter = {};
    filter = {
      ...(appointmentId && { appointmentId }),
      ...(paymentMethod && { paymentMethod }),
      ...(userId && { userId }),
    };

    const allBills = await Bill.find(filter);
    res.status(200).json(allBills);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

exports.createBill = async (req, res) => {
  const {
    appointmentId,
    amount,
    isBaseAdded,
    discount,
    paymentMethod,
    isPaid,
    notes,
  } = req.body;

  try {
    const newBill = new Bill({
      appointmentId,
      amount,
      isBaseAdded,
      discount,
      paymentMethod,
      isPaid,
      notes,
    });

    const isAppointmentExists = await Bill.findOne({ appointmentId });
    if (isAppointmentExists) {
      return res.status(400).json({
        message: "Bill for this appointment already exists.",
      });
    }
    if (!appointmentId) {
      throw new Error("Appointment ID is required");
    }

    await newBill.save();
    res.status(201).json(newBill);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: err.message || "Server Error" });
  }
};

exports.updateBill = async (req, res) => {
  const { amount, isBaseAdded, discount, paymentMethod, isPaid, notes } =
    req.body;
  const { billId } = req.params;
  try {
    if (!billId) {
      throw new Error({ message: "Bill ID is required" });
    }
    const updateBill = await Bill.findByIdAndUpdate(
      billId,
      {
        amount,
        isBaseAdded,
        discount,
        paymentMethod,
        isPaid,
        notes,
      },
      { new: true, runValidators: true }
    );
    res.status(200).json(updateBill);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};
