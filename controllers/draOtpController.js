// draOtpController.js
import createOtpModel from '../models/Otp.js';
// import createOtpModel from '../models/otp.js';
import crypto from 'crypto';

export const sendOtpToPatient = async (req, res) => {
  try {
    const { mobile } = req.body; // Patient mobile
    const conn = req.conn2;
    const Otp = createOtpModel(conn);

    const otp = crypto.randomInt(1000, 9999).toString();
    const createdAt = new Date();

    await Otp.findOneAndUpdate(
      { phoneNumber: mobile },
      { otp, createdAt, verifiedAt: null, startServiceAt: null },
      { upsert: true, new: true }
    );

    console.log(`OTP for ${mobile}: ${otp}`); // ✅ Show for testing

    res.status(200).json({ message: 'OTP sent', otp }); // Don't return OTP in production
  } catch (err) {
    console.error('Error sending OTP:', err);
    res.status(500).json({ message: 'Error sending OTP' });
  }
};

export const verifyOtpFromPatient = async (req, res) => {
  try {
    const { mobile, otp } = req.body;
    const conn = req.conn2;
    const Otp = createOtpModel(conn);

    const record = await Otp.findOne({ phoneNumber: mobile });

    if (!record || record.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (Date.now() > new Date(record.createdAt).getTime() + 5 * 60 * 1000) {
      return res.status(400).json({ message: 'OTP expired' });
    }

    record.verifiedAt = new Date();
    record.startServiceAt = new Date();
    await record.save();

    res.status(200).json({ message: 'OTP verified. Service can start.' });
  } catch (err) {
    console.error('Error verifying OTP:', err);
    res.status(500).json({ message: 'OTP verification failed' });
  }
};
