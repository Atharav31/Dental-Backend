const cron = require("node-cron");
const Appointment = require("../models/appointment");
const moment = require("moment");
const { sendWhatsApp } = require("./sendWhatsApp");
const {
	reminderTomorrowTemplate,
	reminderTodayTemplate,
} = require("../Templates/whatsappTemplates");

// Reminder for TOMORROW's appointments (send at 9:00 AM today)
cron.schedule("0 9 * * *", async () => {
	console.log(" Sending reminders for tomorrow...");

	const tomorrow = moment().add(1, "day").format("DD/MM/YYYY");

	const appointments = await db.getAppointmentsByDate(tomorrow);

	for (const appt of appointments) {
		const msg = await sendWhatsApp(reminderTomorrowTemplate(appt));
		console.log(`Reminder for tomorrow sent to ${appt.patientName}`);
	}
});

// Reminder for TODAY's appointments (send at 8:00 AM same day)
cron.schedule("0 8 * * *", async () => {
	console.log("Sending reminders for today...");

	const today = moment().format("DD/MM/YYYY");

	const appointments = await db.getAppointmentsByDate(today);

	for (const appt of appointments) {
		const msg = await sendWhatsApp(reminderTodayTemplate(appt));
		console.log(msg);
		console.log(` Reminder for today sent to ${appt.patientName}`);
	}
});

const db = {
	// Fetch appointments for a specific date (exclude cancelled/completed)
	getAppointmentsByDate: async (dateString) => {
		return await Appointment.find({
			date: dateString,
			status: { $nin: ["Cancelled", "Completed"] },
		});
	},
};
