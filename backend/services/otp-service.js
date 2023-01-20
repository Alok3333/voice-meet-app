const crypto = require('crypto');
const hashService = require('./hash-service');

const smsSid = process.env.SMS_SID;
const smsAuthToken = process.env.SMS_AUTH_TOKEN;
const twilio = require('twilio')(smsSid, smsAuthToken, {
  lazyLoading: true,
});

class OtpService {
  async generateOtp() {
    const otp = crypto.randomInt(1000, 9999);
    return otp;
  }

  async sendBySms(phone, otp) {
    return twilio.messages.create({
      to: phone,
      from: process.env.SMS_FROM_NUMBER,
      body: `Your voicemeet otp ${otp}`,
    });
  }

  verifyOtp(hashedOtp, data) {
    // creating new hash name is computedHash
    let computedHash = hashService.hashOtp(data);

    return computedHash === hashedOtp;

    // if (computedHash === hashedOtp) {
    //   return true;
    // } else {
    //   return false;
    // }
  }
}

module.exports = new OtpService();
