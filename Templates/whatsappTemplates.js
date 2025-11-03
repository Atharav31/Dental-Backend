// Function to generate template payload
const buildTemplatePayload = (
	templateName,
	appointment,
	expectedParams = 4
) => {
	const {
		patientName,
		date,
		time,
		description = "",
		status,
		phoneNo,
	} = appointment;

	// Always build in order
	const allParams = [
		{ type: "text", text: patientName }, // {{1}}
		{ type: "text", text: date }, // {{2}}
		{ type: "text", text: time.endsWith(":00") ? time : `${time}:00` }, // {{3}}
		{ type: "text", text: status }, // {{4}}
		{ type: "text", text: description || " " }, // {{5}}
	];

	// Only keep as many as the template expects
	const parameters = allParams.slice(0, expectedParams);

	return {
		messaging_product: "whatsapp",
		to: phoneNo, // recipient number in international format
		type: "template",
		template: {
			name: templateName,
			language: { code: "en" },
			components: [
				// ✅ Add header image
				{
					type: "header",
					parameters: [
						{
							type: "image",
							image: {
								link: "https://res.cloudinary.com/deqor1ikw/image/upload/v1758050775/logo_sbx9pe.png",
							},
						},
					],
				},
				{
					type: "body",
					parameters,
				},
			],
		},
	};
};

// Specific template functions
const appointmentCreatedTemplate = (appointment) =>
	buildTemplatePayload("appointment_created", appointment, 5); // {{1}}–{{5}}

const appointmentStatusUpdatedTemplate = (appointment) =>
	buildTemplatePayload("appointment_status_updated", appointment, 5);

const reminderTodayTemplate = (appointment) =>
	buildTemplatePayload("appointment_reminder_today", appointment, 5);

const reminderTomorrowTemplate = (appointment) =>
	buildTemplatePayload("appointment_reminder_tomorrow", appointment, 5);

const appointmentCancelledTemplate = (appointment) =>
	buildTemplatePayload("appointment_cancelled", appointment, 5);

module.exports = {
	appointmentCreatedTemplate,
	appointmentStatusUpdatedTemplate,
	reminderTodayTemplate,
	reminderTomorrowTemplate,
	appointmentCancelledTemplate,
};
