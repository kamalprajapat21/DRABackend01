// // import UrgentCase from '../models/UrgentCaseModel.js';
// // import sendOtp from '../utils/sendOtp.js'; // Mock or real OTP sender
// // import { generateOtp } from '../utils/otpHelper.js';

// // export const startService = async (req, res) => {
// //   try {
// //     const { bookingId } = req.params;
// //     const otp = generateOtp();

// //     const caseDoc = await UrgentCase.findOne({ 'bookings.bookingId': bookingId });
// //     if (!caseDoc) return res.status(404).json({ message: 'Booking not found' });

// //     const booking = caseDoc.bookings.find(b => b.bookingId === bookingId);
// //     booking.startOtp = otp;

// //     await sendOtp(booking.mobileNumber, otp);
// //     await caseDoc.save();

// //     res.status(200).json({ message: 'OTP sent to patient for starting service' });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: 'Error sending OTP' });
// //   }
// // };

// // export const verifyStartOtp = async (req, res) => {
// //   try {
// //     const { bookingId } = req.params;
// //     const { otp } = req.body;

// //     const caseDoc = await UrgentCase.findOne({ 'bookings.bookingId': bookingId });
// //     if (!caseDoc) return res.status(404).json({ message: 'Booking not found' });

// //     const booking = caseDoc.bookings.find(b => b.bookingId === bookingId);
// //     if (booking.startOtp !== otp) return res.status(400).json({ message: 'Invalid OTP' });

// //     booking.serviceStartedAt = new Date();
// //     booking.isServiceStarted = true;
// //     booking.startOtp = null;

// //     await caseDoc.save();
// //     res.status(200).json({ message: 'Service started, timer running' });
// //   } catch (err) {
// //     res.status(500).json({ message: 'Error verifying OTP' });
// //   }
// // };

// // export const endService = async (req, res) => {
// //   try {
// //     const { bookingId } = req.params;
// //     const otp = generateOtp();

// //     const caseDoc = await UrgentCase.findOne({ 'bookings.bookingId': bookingId });
// //     if (!caseDoc) return res.status(404).json({ message: 'Booking not found' });

// //     const booking = caseDoc.bookings.find(b => b.bookingId === bookingId);
// //     booking.endOtp = otp;

// //     await sendOtp(booking.mobileNumber, otp);
// //     await caseDoc.save();

// //     res.status(200).json({ message: 'OTP sent for ending service' });
// //   } catch (err) {
// //     res.status(500).json({ message: 'Error sending OTP' });
// //   }
// // };

// // export const verifyEndOtp = async (req, res) => {
// //   try {
// //     const { bookingId } = req.params;
// //     const { otp } = req.body;

// //     const caseDoc = await UrgentCase.findOne({ 'bookings.bookingId': bookingId });
// //     if (!caseDoc) return res.status(404).json({ message: 'Booking not found' });

// //     const booking = caseDoc.bookings.find(b => b.bookingId === bookingId);
// //     if (booking.endOtp !== otp) return res.status(400).json({ message: 'Invalid OTP' });

// //     booking.serviceEndedAt = new Date();
// //     booking.isServiceEnded = true;
// //     booking.endOtp = null;

// //     const durationMs = new Date(booking.serviceEndedAt) - new Date(booking.serviceStartedAt);
// //     booking.timerData = {
// //       hours: Math.floor(durationMs / (1000 * 60 * 60)),
// //       minutes: Math.floor((durationMs / (1000 * 60)) % 60),
// //       seconds: Math.floor((durationMs / 1000) % 60)
// //     };

// //     await caseDoc.save();
// //     res.status(200).json({ message: 'Service ended, timer stopped' });
// //   } catch (err) {
// //     res.status(500).json({ message: 'Error verifying end OTP' });
// //   }
// // };





// import UrgentCase from '../models/UrgentCaseModel.js';
// import sendOtp from '../utils/sendOtp.js';
// import { generateOtp } from '../utils/otpHelper.js';

// // export const startService = async (req, res) => {
// //   try {
// //     const { bookingId } = req.body;
// //     const otp = generateOtp();

// //     const caseDoc = await UrgentCase.findOne({ 'bookings.bookingId': bookingId });
// //     if (!caseDoc) return res.status(404).json({ message: 'Booking not found' });

// //     const booking = caseDoc.bookings.find(b => b.bookingId === bookingId);
// //     booking.startOtp = otp;

// //     await sendOtp(booking.mobileNumber, otp);
// //     await caseDoc.save();

// //     res.status(200).json({ message: 'OTP sent to patient for starting service' });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: 'Error sending OTP' });
// //   }
// // };

// // export const startService = async (req, res) => {
// //   try {
// //     const { mobileNumber } = req.body;
// //     const otp = Math.floor(100000 + Math.random() * 900000).toString();

// //     const caseDoc = await UrgentCase.findOne({ 'bookings.mobileNumber': mobileNumber });
// //     if (!caseDoc) return res.status(404).json({ message: 'Booking not found' });

// //     const booking = caseDoc.bookings.find(b => b.mobileNumber === mobileNumber);
// //     booking.startOtp = otp;

// //     await sendOtp(mobileNumber, otp);
// //     await caseDoc.save();

// //     res.status(200).json({ message: 'OTP sent to patient for starting service' });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: 'Error sending OTP' });
// //   }
// // };

// export const startService = async (req, res) => {
//   try {
//     const { mobileNumber } = req.body;
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     // Dummy logic — pretend we found the booking
//     const booking = {
//       mobileNumber,
//       startOtp: otp,
//     };

//     await sendOtp(mobileNumber, otp);

//     res.status(200).json({
//       message: 'OTP sent to patient for starting service',
//       dummyBooking: booking,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error sending OTP' });
//   }
// };

// // export const verifyStartOtp = async (req, res) => {
// //   try {
// //     const { bookingId, otp } = req.body;

// //     const caseDoc = await UrgentCase.findOne({ 'bookings.bookingId': bookingId });
// //     if (!caseDoc) return res.status(404).json({ message: 'Booking not found' });

// //     const booking = caseDoc.bookings.find(b => b.bookingId === bookingId);
// //     if (booking.startOtp !== otp) return res.status(400).json({ message: 'Invalid OTP' });

// //     booking.serviceStartedAt = new Date();
// //     booking.isServiceStarted = true;
// //     booking.startOtp = null;

// //     await caseDoc.save();
// //     res.status(200).json({ message: 'Service started, timer running' });
// //   } catch (err) {
// //     res.status(500).json({ message: 'Error verifying OTP' });
// //   }
// // };


// export const verifyStartOtp = async (req, res) => {
//   try {
//     const { mobileNumber, otp } = req.body;

//     // Dummy OTP check — assuming correct OTP is "123456"
//     if (otp !== "123456") {
//       return res.status(400).json({ message: 'Invalid OTP (dummy check)' });
//     }

//     res.status(200).json({
//       message: 'Service started, timer running (dummy)',
//       serviceStartedAt: new Date(),
//     });
//   } catch (err) {
//     res.status(500).json({ message: 'Error verifying OTP (dummy)' });
//   }
// };


// // export const endService = async (req, res) => {
// //   try {
// //     const { bookingId } = req.body;
// //     const otp = generateOtp();

// //     const caseDoc = await UrgentCase.findOne({ 'bookings.bookingId': bookingId });
// //     if (!caseDoc) return res.status(404).json({ message: 'Booking not found' });

// //     const booking = caseDoc.bookings.find(b => b.bookingId === bookingId);
// //     booking.endOtp = otp;

// //     await sendOtp(booking.mobileNumber, otp);
// //     await caseDoc.save();

// //     res.status(200).json({ message: 'OTP sent for ending service' });
// //   } catch (err) {
// //     res.status(500).json({ message: 'Error sending OTP' });
// //   }
// // };


// export const endService = async (req, res) => {
//   try {
//     const { mobileNumber } = req.body;
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     await sendOtp(mobileNumber, otp);

//     res.status(200).json({
//       message: 'OTP sent for ending service (dummy)',
//       dummyOtp: otp,
//     });
//   } catch (err) {
//     res.status(500).json({ message: 'Error sending OTP (dummy)' });
//   }
// };

// // export const verifyEndOtp = async (req, res) => {
// //   try {
// //     const { bookingId, otp } = req.body;

// //     const caseDoc = await UrgentCase.findOne({ 'bookings.bookingId': bookingId });
// //     if (!caseDoc) return res.status(404).json({ message: 'Booking not found' });

// //     const booking = caseDoc.bookings.find(b => b.bookingId === bookingId);
// //     if (booking.endOtp !== otp) return res.status(400).json({ message: 'Invalid OTP' });

// //     booking.serviceEndedAt = new Date();
// //     booking.isServiceEnded = true;
// //     booking.endOtp = null;

// //     const durationMs = new Date(booking.serviceEndedAt) - new Date(booking.serviceStartedAt);
// //     booking.timerData = {
// //       hours: Math.floor(durationMs / (1000 * 60 * 60)),
// //       minutes: Math.floor((durationMs / (1000 * 60)) % 60),
// //       seconds: Math.floor((durationMs / 1000) % 60)
// //     };

// //     await caseDoc.save();
// //     res.status(200).json({ message: 'Service ended, timer stopped' });
// //   } catch (err) {
// //     res.status(500).json({ message: 'Error verifying end OTP' });
// //   }
// // };


// export const verifyEndOtp = async (req, res) => {
//   try {
//     const { mobileNumber, otp } = req.body;

//     // Dummy OTP check — assuming correct OTP is "654321"
//     if (otp !== "654321") {
//       return res.status(400).json({ message: 'Invalid OTP (dummy check)' });
//     }

//     const duration = {
//       hours: 0,
//       minutes: 45,
//       seconds: 30,
//     };

//     res.status(200).json({
//       message: 'Service ended, timer stopped (dummy)',
//       duration,
//     });
//   } catch (err) {
//     res.status(500).json({ message: 'Error verifying end OTP (dummy)' });
//   }
// };




import sendOtp from '../utils/sendOtp.js';

// In-memory timer map (for dummy logic)
const activeTimers = new Map(); // mobileNumber => start Date

// Generate simple 6-digit OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// 📍 Start Service
export const startService = async (req, res) => {
  try {
    const { mobileNumber } = req.body;
    const otp = generateOtp();

    // Store start time in memory
    activeTimers.set(mobileNumber, new Date());

    // Send OTP (dummy function)
    await sendOtp(mobileNumber, otp);

    res.status(200).json({
      message: 'OTP sent to patient for starting service',
      dummyStartTime: activeTimers.get(mobileNumber),
      dummyOtp: otp, // You can remove this in production
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error sending OTP' });
  }
};

// 📍 Verify Start OTP
export const verifyStartOtp = async (req, res) => {
  try {
    const { mobileNumber, otp } = req.body;

    // Dummy OTP check
    if (otp !== "123456") {
      return res.status(400).json({ message: 'Invalid OTP (dummy check)' });
    }

    const startedAt = activeTimers.get(mobileNumber);
    if (!startedAt) {
      return res.status(404).json({ message: 'Timer not initialized' });
    }

    res.status(200).json({
      message: 'Service started, timer running (dummy)',
      startedAt,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error verifying OTP (dummy)' });
  }
};

// 📍 End Service
export const endService = async (req, res) => {
  try {
    const { mobileNumber } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await sendOtp(mobileNumber, otp);

    res.status(200).json({
      message: 'OTP sent for ending service (dummy)',
      dummyOtp: otp,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error sending OTP (dummy)' });
  }
};


// 📍 Verify End OTP
export const verifyEndOtp = async (req, res) => {
  try {
    const { mobileNumber, otp } = req.body;

    if (otp !== "654321") {
      return res.status(400).json({ message: 'Invalid OTP (dummy check)' });
    }

    const startTime = activeTimers.get(mobileNumber);
    if (!startTime) {
      return res.status(404).json({ message: 'Start time not found for this number' });
    }

    const endTime = new Date();
    const durationMs = endTime - startTime;

    const duration = {
      hours: Math.floor(durationMs / (1000 * 60 * 60)),
      minutes: Math.floor((durationMs / (1000 * 60)) % 60),
      seconds: Math.floor((durationMs / 1000) % 60),
    };

    // Remove timer
    activeTimers.delete(mobileNumber);

    res.status(200).json({
      message: 'Service ended, timer stopped (dummy)',
      startedAt: startTime,
      endedAt: endTime,
      duration,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error verifying end OTP (dummy)' });
  }
};
