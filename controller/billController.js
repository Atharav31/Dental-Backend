const appointment = require("../models/appointment");
const Bill = require("../models/Bill");

exports.billController = async (req, res) => {
	try {
		const {
			appointmentId,
			page = 1,
			limit = 10,
			paymentMethod,
			userId,
		} = req.query;

		// Build filter dynamically
		let filter = {
			...(appointmentId && { appointmentId }),
			...(paymentMethod && { paymentMethod }),
			...(userId && { userId }),
		};

		// Fetch bills with appointment + prescription details
		const allBills = await Bill.find(filter)
			.populate([
				{
					path: "appointmentId",
					select: "patientName phoneNo date time prescriptionId gender age",
					populate: {
						path: "prescriptionId", // nested populate
						select:
							"treatments medicines instructions proceduresPerformed doctorName nextVisit",
					},
				},
			])
			.limit(limit * 1)
			.skip((page - 1) * limit);

		res.status(200).json(allBills);
	} catch (err) {
		res
			.status(500)
			.json({ message: "Internal Server Error", error: err.message });
	}
};

exports.createBill = async (req, res) => {
	const {
		invoiceNo,
		appointmentId,
		amount,
		isBaseAdded,
		discount,
		paymentMethod,
		isPaid,
		notes,
		items,
	} = req.body;

	try {
		const newBill = new Bill({
			invoiceNo,
			appointmentId,
			amount,
			items,
			isBaseAdded,
			discount,
			paymentMethod,
			isPaid,
			notes,
		});

		const isAppointmentExists = await Bill.find({ appointmentId });
		console.log(isAppointmentExists);
		const appointmentToUpdate = await appointment.findById(appointmentId);
		if (isAppointmentExists.length > 0) {
			return res.status(400).json({
				message: "Bill for this appointment already exists.",
			});
		}
		if (!appointmentId) {
			throw new Error("Appointment ID is required");
		}

		await newBill.save();
		await appointment.updateOne(
			{ _id: appointmentToUpdate },
			{
				$set: {
					billID: newBill._id,
				},
			}
		);
		res.status(201).json(newBill);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ message: err.message || "Server Error" });
	}
};

exports.updateBill = async (req, res) => {
	const {
		amount,
		isBaseAdded,
		discount,
		paymentMethod,
		isPaid,
		notes,
		items,
		invoiceNo,
	} = req.body;
	const { billId } = req.params;
	try {
		if (!billId) {
			throw new Error({ message: "Bill ID is required" });
		}
		const updateBill = await Bill.findByIdAndUpdate(
			billId,
			{
				amount,
				invoiceNo,
				isBaseAdded,
				discount,
				paymentMethod,
				isPaid,
				notes,
				items,
			},
			{ new: true, runValidators: true }
		);
		res.status(200).json(updateBill);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ message: "Server Error" });
	}
};
