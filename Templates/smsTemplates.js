// Utility function to generate appointment messages
const buildAppointmentMessage = (appointment, options) => {
	const { patientName, date, time, description, status } = appointment;
	const { actionLine, includeThankYou = false } = options;

	return `Hello ${patientName},

Your appointment ${actionLine}.

Date: ${date}  
Time: ${time}:00  
Status: ${status}${description ? `\nNotes: ${description}` : ""}

${
	includeThankYou ? "Thank you for choosing us. " : ""
}Please arrive at least 10 minutes before your scheduled time.

Best regards,  
Dr. Martande's Dental Clinic  
Contact: 098903 53072  
Location: https://g.co/kgs/Qu3TDDe`;
};

// Specific messages
const appointmentCreatedMessage = (appointment) =>
	buildAppointmentMessage(appointment, {
		actionLine: "has been successfully created",
	});

const updateStatusMessage = (appointment) =>
	buildAppointmentMessage(appointment, {
		actionLine: "has been updated",
		includeThankYou: true,
	});

const reminderMessageToday = (appointment) =>
	buildAppointmentMessage(appointment, {
		actionLine: "is scheduled for today",
		includeThankYou: true,
	});

const reminderMessageTomorrow = (appointment) =>
	buildAppointmentMessage(appointment, {
		actionLine: "is scheduled for tomorrow",
		includeThankYou: true,
	});

const cancellationMessage = (appointment) =>
	buildAppointmentMessage(appointment, {
		actionLine: "has been cancelled",
	});

module.exports = {
	appointmentCreatedMessage,
	updateStatusMessage,
	reminderMessageToday,
	reminderMessageTomorrow,
	cancellationMessage,
};
