import express from 'express';
import { sendHomeOtp, checkHomeOtp } from '../controllers/homeOtpController.js';

const router = express.Router();

router.post('/send-home-otp/:labId', sendHomeOtp);
router.post('/verify-home-otp/:labId', checkHomeOtp);

export default router;
