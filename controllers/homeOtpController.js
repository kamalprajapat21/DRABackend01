import createHomeModel from '../models/BOOKING/Home.js'; // Dynamic model function
import crypto from 'crypto';

export const sendHomeOtp = async (req, res) => {
  try {
    const Home = createHomeModel(req.conn2); // Dynamic DB connection
    console.log(Home);
    const { labId } = req.params;

    const otp = crypto.randomInt(1000, 9999); // Generate 4-digit OTP

    console.log("Sending OTP for labId:", labId);

    // Update booking by labId
    const booking = await Home.findOneAndUpdate(
      { 'bookings.labId': labId },
      { $set: { 'bookings.$.bookingOtp': otp } },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({ message: 'OTP sent successfully', otp });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send OTP',
      error: error.message,
    });
  }
};

export const checkHomeOtp = async (req, res) => {
  try {
    const Home = createHomeModel(req.conn2);
    const { labId } = req.params;
    const { otp } = req.body;

    const home = await Home.findOne({ 'bookings.labId': labId });

    if (!home) {
      return res.status(404).json({ success: false, message: 'HomeCare entry not found' });
    }

    const booking = home.bookings.find(b => b.labId === labId);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (!otp) {
      return res.status(400).json({ success: false, message: 'Please enter OTP' });
    }

    if (booking.bookingOtp !== otp) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    return res.status(200).json({ success: true, message: 'OTP verified successfully' });
  } catch (error) {
    console.error('Error checking OTP:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to verify OTP',
      error: error.message,
    });
  }
};
