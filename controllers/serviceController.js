// File: controllers/serviceController.js
import UrgentCase from '../models/UrgentCaseModel.js';
import { sendOtpToMobile } from '../utils/sendOtp.js'; // Your actual OTP sending logic
import generateOtp from '../utils/generateOtp.js'; // A helper to generate a 6-digit OTP

// Start Service
export const startService = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const otp = generateOtp(); // e.g., 6-digit random

    const urgentCase = await UrgentCase.findOne({ 'bookings.bookingId': bookingId });

    if (!urgentCase) return res.status(404).json({ message: 'Booking not found' });

    const booking = urgentCase.bookings.find(b => b.bookingId === bookingId);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    // Save OTP
    booking.startOtp = otp;
    await urgentCase.save();

    // Send OTP to patient
    await sendOtpToMobile(booking.mobileNumber, `Your start service OTP is ${otp}`);

    res.status(200).json({ success: true, message: 'OTP sent to start service' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Verify Start OTP and Start Timer
export const verifyStartOtp = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { otp } = req.body;

    const urgentCase = await UrgentCase.findOne({ 'bookings.bookingId': bookingId });
    if (!urgentCase) return res.status(404).json({ message: 'Booking not found' });

    const booking = urgentCase.bookings.find(b => b.bookingId === bookingId);
    if (booking.startOtp !== otp) return res.status(400).json({ message: 'Invalid OTP' });

    booking.serviceStartedAt = new Date();
    booking.isServiceStarted = true;

    await urgentCase.save();

    res.status(200).json({ success: true, message: 'Service started successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// End Service - Generate OTP
export const endServiceOtp = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const otp = generateOtp();

    const urgentCase = await UrgentCase.findOne({ 'bookings.bookingId': bookingId });
    if (!urgentCase) return res.status(404).json({ message: 'Booking not found' });

    const booking = urgentCase.bookings.find(b => b.bookingId === bookingId);
    booking.endOtp = otp;
    await urgentCase.save();

    await sendOtpToMobile(booking.mobileNumber, `Your end service OTP is ${otp}`);

    res.status(200).json({ success: true, message: 'End service OTP sent' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Verify End OTP and Stop Timer
export const verifyEndOtp = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { otp } = req.body;

    const urgentCase = await UrgentCase.findOne({ 'bookings.bookingId': bookingId });
    if (!urgentCase) return res.status(404).json({ message: 'Booking not found' });

    const booking = urgentCase.bookings.find(b => b.bookingId === bookingId);
    if (booking.endOtp !== otp) return res.status(400).json({ message: 'Invalid OTP' });

    booking.serviceEndedAt = new Date();
    booking.isServiceEnded = true;

    // Calculate timer
    const ms = new Date(booking.serviceEndedAt) - new Date(booking.serviceStartedAt);
    const seconds = Math.floor(ms / 1000);
    booking.timerData = {
      hours: Math.floor(seconds / 3600),
      minutes: Math.floor((seconds % 3600) / 60),
      seconds: seconds % 60,
    };

    await urgentCase.save();

    res.status(200).json({ success: true, message: 'Service ended successfully', timer: booking.timerData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
