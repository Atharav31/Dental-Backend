require('dotenv').config();
const twilio = require('twilio');

const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

async function sendOtp(phoneNumber) {
    try {
        const verification = await client.verify.v2.services(process.env.TWILIO_SERVICE_SID)
            .verifications.create({ to: phoneNumber, channel: 'sms' });
        
        console.log('OTP sent:', verification.status);
    } catch (error) {
        console.error('Error sending OTP:', error.message);
    }
}

async function verifyOtp(phoneNumber, otpCode) {
    try {
        const verificationCheck = await client.verify.v2.services(process.env.TWILIO_SERVICE_SID)
            .verificationChecks.create({ to: phoneNumber, code: otpCode });

        console.log('OTP verification status:', verificationCheck.status);
    } catch (error) {
        console.error('Error verifying OTP:', error.message);
    }
}
module.exports = {sendOtp,verifyOtp};