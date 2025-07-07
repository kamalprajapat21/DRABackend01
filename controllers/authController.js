// backend/controllers/authController.js
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Adjust model path as per your project structure

// Verify OTP function
const verifyOTP = asyncHandler(async (req, res) => {
  const { mobile, otp } = req.body;

  // Find user by mobile number and OTP
  const user = await User.findOne({ mobile, otp });

  if (!user) {
    res.status(401).json({ message: 'Invalid OTP' });
    return;
  }

  // Generate JWT token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Adjust token expiry as needed
  });

  res.status(200).json({
    token,
    user: {
      _id: user._id,
      mobile: user.mobile,
      firstName: user.firstName, // Add other user details as needed
      lastName: user.lastName,
    },
  });
});

export { verifyOTP };
