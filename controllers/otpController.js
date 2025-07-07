// otpController.js
import createUrgentCase from '../models/UrgentCase.js';
import crypto from 'crypto';

export const sendOtp = async (req, res) => {
  try {
    const { caseId } = req.params;
    const Case = createUrgentCase(req.conn1);
    const otp = crypto.randomInt(1000, 9999);

    const updated = await Case.findByIdAndUpdate(
      caseId,
      { draOtp: otp },
      { new: true }
    );

    console.log(`OTP for patient: ${otp}`);
    res.status(200).json({ message: 'OTP sent', otp }); // remove OTP in prod
  } catch (err) {
    res.status(500).json({ message: 'Send OTP failed', error: err.message });
  }
};

export const checkOtp = async (req, res) => {
  try {
    const { caseId } = req.params;
    const { otp } = req.body;
    const Case = createUrgentCase(req.conn1);

    const urgentCase = await Case.findById(caseId);

    if (!urgentCase) {
      return res.status(404).json({ message: 'Case not found' });
    }

    if (urgentCase.draOtp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    res.json({ message: 'OTP verified. You can start the service.' });
  } catch (err) {
    res.status(500).json({ message: 'Verify OTP failed', error: err.message });
  }
};
