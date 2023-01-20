const otpService = require('../services/otp-service');
const hashService = require('../services/hash-service');
const { verifyOtp } = require('../services/otp-service');

class AuthController {
  async sendOtp(req, res) {
    // logic

    const { phone } = req.body;
    if (!phone) {
      res.status(400).json({ message: 'phone field is required!' });
    }

    // otp generate process by the help of crypto
    const otp = await otpService.generateOtp();

    // hash (ttl = timetolive)
    const ttl = 1000 * 60 * 2; // after 2 min expire otp
    const expires = Date.now() + ttl;
    const data = `${phone}.${otp}.${expires}`;
    const hash = hashService.hashOtp(data);

    // send OTP
    try {
      await otpService.sendBySms(phone, otp);
      return res.json({
        hash: `${hash}.${expires}`,
        phone,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'message sending failed' });
    }

    // res.json({ hash: hash });
  }

  // verify OTP
  verifyOtp(req, res) {
    // logic
    const { otp, hash, phone } = req.body;
    if (!otp || !hash || !phone) {
      res.status(400).json({ message: 'All fields are required!' });
    }

    const [hashedOtp, expires] = hash.split('.');
    if (Date.now() > expires) {
      res.status(400).json({ message: 'OTP expired!' });
    }

    const data = `${phone}.${otp}.${expires}`;

    const isValid = otpService.verifyOtp(hashedOtp, data);

    if (!isValid) {
      res.status(400).json({ message: 'Invalid OTP' });
    }


    let user;
    let accessToken;
    let refreshToken;
  }
}

module.exports = new AuthController();
