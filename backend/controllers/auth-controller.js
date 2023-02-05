const otpService = require('../services/otp-service');
const hashService = require('../services/hash-service');
const userService = require('../services/user-service');
const tokenService = require('../services/token-service');
const UserDto = require('../dtos/user-dto');

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
      // await otpService.sendBySms(phone, otp);
      return res.json({
        hash: `${hash}.${expires}`,
        phone,
        otp,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'message sending failed' });
    }

    // res.json({ hash: hash });
  }

  // verify OTP
  async verifyOtp(req, res) {
    // logic
    const { otp, hash, phone } = req.body;
    if (!otp || !hash || !phone) {
      res.status(400).json({ message: 'All fields are required!' });
    }

    const [hashedOtp, expires] = hash.split('.');
    if (Date.now() > +expires) {
      res.status(400).json({ message: 'OTP expired!' });
    }

    const data = `${phone}.${otp}.${expires}`;

    const isValid = otpService.verifyOtp(hashedOtp, data);

    if (!isValid) {
      res.status(400).json({ message: 'Invalid OTP' });
    }

    let user;

    try {
      user = await userService.findUser({ phone: phone });
      if (!user) {
        user = await userService.createUser({ phone });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Db error' });
    }

    // Token
    const { accessToken, refreshToken } = tokenService.generateToken({
      _id: user._id,
      activated: false,
    });

    res.cookie('refreshToken', refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    const userDto = new UserDto(user);
    res.json({ accessToken, user: userDto });
  }
}

module.exports = new AuthController();
