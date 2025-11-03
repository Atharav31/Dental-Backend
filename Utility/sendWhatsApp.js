const axios = require("axios");

const sendWhatsApp = async (templatePayload) => {
	const token = process.env.META_WHATSAPP_TOKEN;

	try {
		// Debug: log final payload
		console.log(
			"📤 Sending WhatsApp payload:",
			JSON.stringify(templatePayload, null, 2)
		);

		const response = await axios.post(
			`https://graph.facebook.com/v22.0/${process.env.META_PHONE_NUMBER_ID}/messages`,
			templatePayload,
			{
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			}
		);

		console.log("✅ WhatsApp message sent:", response.data);
		return response.data;
	} catch (error) {
		console.error(
			"❌ WhatsApp API error:",
			error.response?.data || error.message
		);
		throw error;
	}
};

module.exports = { sendWhatsApp };
