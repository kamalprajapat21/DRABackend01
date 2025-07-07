///aDD NEW CODE
import express from 'express';
import { sendOtp, verifyOtp, getTimerData } from '../../controllers/Nursing/NursingCaseOtpController.js';
// import { sendOtp, verifyOtp } from '../../controllers/BOOKING/urgentotpControllerDRA.js';

const router = express.Router();

// Send OTP to patient
router.post('/send-otp/:bookingId/:type', sendOtp);

// Verify OTP (start/end)
router.post('/verify-otp/:bookingId/:type', verifyOtp);

// Fetch timer and status info from DRA
router.get('/timer/:bookingId', getTimerData);


export default router;