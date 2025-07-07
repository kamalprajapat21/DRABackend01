// import createDraBooking from '../../models/BOOKING/DraBookingModel.js';
// import crypto from 'crypto';


// export const sendOtpDra = async (req, res) => {
//   try {
//     const DraBooking = createDraBooking(req.conn2);
//     const { bookingId } = req.params;

//     console.log(bookingId);

//     // First, find the document and index of the booking
//     const draDoc = await DraBooking.findOne({ 'bookings.bookingId': bookingId });

//     if (!draDoc) return res.status(404).json({ message: 'Booking not found' });

//     const bookingIndex = draDoc.bookings.findIndex(b => b.bookingId === bookingId);
//     if (bookingIndex === -1) return res.status(404).json({ message: 'Booking ID not found in array' });

//     const otp = crypto.randomInt(1000, 9999).toString();

//     // Set the OTP value manually at the found index
//     draDoc.bookings[bookingIndex].bookingOtp = otp;

//     await draDoc.save(); // Save the updated document

//     res.status(200).json({
//       success: true,
//       message: 'Start OTP sent successfully',
//       otp // ⚠️ Remove in production
//     });
//   } catch (error) {
//     console.error('Error sending OTP:', error);
//     res.status(500).json({ success: false, message: 'Failed to send OTP', error: error.message });
//   }
// };

// // ✅ Verify OTP and START service (start timer)
// export const checkOtpDra = async (req, res) => {
//   try {
//     const DraBooking = createDraBooking(req.conn1);
//     const { bookingId } = req.params;
//     const { otp } = req.body;

//     const dra = await DraBooking.findOne({ 'bookings.bookingId': bookingId });
//     if (!dra) return res.status(404).json({ message: 'Booking not found' });

//     const booking = dra.bookings.find(b => b.bookingId === bookingId);
//     if (!booking) return res.status(404).json({ message: 'Booking not found in array' });

//     if (!otp) return res.status(400).json({ message: 'Please enter OTP' });

//     if (booking.bookingOtp !== otp)
//       return res.status(400).json({ message: 'Invalid OTP' });

//     await DraBooking.updateOne(
//       { 'bookings.bookingId': bookingId },
//       {
//         $set: {
//           'bookings.$.timerStart': new Date(),
//           'bookings.$.serviceStatus': 'started'
//         }
//       }
//     );

//     res.status(200).json({ success: true, message: 'OTP verified. Timer started.' });
//   } catch (error) {
//     console.error('Error verifying OTP:', error);
//     res.status(500).json({ success: false, message: 'Failed to verify OTP', error: error.message });
//   }
// };

// // ✅ Send OTP to STOP service
// export const sendStopOtpDra = async (req, res) => {
//   try {
//     const DraBooking = createDraBooking(req.conn1);
//     const { bookingId } = req.params;
//     const otp = crypto.randomInt(1000, 9999).toString();

//     const updated = await DraBooking.findOneAndUpdate(
//       { 'bookings.bookingId': bookingId },
//       { $set: { 'bookings.$.stopOtp': otp } },
//       { new: true }
//     );

//     if (!updated) return res.status(404).json({ message: 'Booking not found' });

//     res.status(200).json({
//       success: true,
//       message: 'Stop OTP sent successfully',
//       otp // ⚠️ Remove in production
//     });
//   } catch (error) {
//     console.error('Error sending stop OTP:', error);
//     res.status(500).json({ success: false, message: 'Failed to send Stop OTP', error: error.message });
//   }
// };

// // ✅ Verify OTP and STOP service (stop timer)
// export const checkStopOtpDra = async (req, res) => {
//   try {
//     const DraBooking = createDraBooking(req.conn1);
//     const { bookingId } = req.params;
//     const { otp } = req.body;

//     const dra = await DraBooking.findOne({ 'bookings.bookingId': bookingId });
//     if (!dra) return res.status(404).json({ message: 'Booking not found' });

//     const booking = dra.bookings.find(b => b.bookingId === bookingId);
//     if (!booking) return res.status(404).json({ message: 'Booking not found in array' });

//     if (!otp) return res.status(400).json({ message: 'Please enter OTP' });

//     if (booking.stopOtp !== otp)
//       return res.status(400).json({ message: 'Invalid Stop OTP' });

//     await DraBooking.updateOne(
//       { 'bookings.bookingId': bookingId },
//       {
//         $set: {
//           'bookings.$.timerEnd': new Date(),
//           'bookings.$.serviceStatus': 'completed'
//         }
//       }
//     );

//     res.status(200).json({ success: true, message: 'Stop OTP verified. Timer stopped.' });
//   } catch (error) {
//     console.error('Error verifying stop OTP:', error);
//     res.status(500).json({ success: false, message: 'Failed to verify Stop OTP', error: error.message });
//   }
// };





// ////Copy from lab
// import createLab from '../../models/BOOKING/UrgentCaseModel.js'; // Adjust the path based on your project structure
// // import createLab from '../models/BOOKING/UrgentCaseModel.js'; // Adjust the path based on your project structure
// // import createLab from '../models/BOOKING/Lab.js'; // Adjust the path based on your project structure
// import mongoose from 'mongoose';
// import crypto from 'crypto';
// export const sendOtp = async (req, res) => {
//   try {
//     const Lab = createLab(req.conn2); // Get the Lab model from the db connection
//     const { urgentCaseAcceptedByid } = req.params; // Get the booking ID from the request parameters
//     const otp = crypto.randomInt(1000, 9999);
//     // const lab = await Lab.findOne({ 'bookings.labId': labId });
//     // const booking = lab.bookings.find(b => b.labId === labId);
//     console.log("test1")
//     // console.log(booking)
//     console.log("test1")

//     res.status(200).json({ message: 'OTP sent successfully', otp });

//     //rajcode
// // rajcode


//   const booking = await Lab.findOneAndUpdate(
//   { 'bookings.labId': urgentCaseAcceptedByid },  // Find the booking with the specified labId
//   { $set: { 'bookings.$.bookingOtp': otp } },  // Update the bookingOtp field for that booking
//   { new: true }  // Return the updated document
// );


// // const labWithBooking = await Lab.findOne({ 'bookings.draId': urgentCaseAcceptedByid });
// // console.log('Lab with booking:', labWithBooking); // Should NOT be null
// console.log('Lab with booking:', urgentCaseAcceptedByid); // Should NOT be null


//     //rajcode
//   } catch (error) {
//     console.error('Error sending OTP:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to send OTP',
//       error: error.message,
//     });
//   }
// };


// export const checkOtp = async (req, res) => {
//   try {
//     const Lab = createLab(req.conn2);
//     const { urgentCaseAcceptedByid } = req.params;
//     const { otp } = req.body;

//     // Find the lab document that contains the booking with the given labId
//     const lab = await Lab.findOne({ 'bookings.labId': urgentCaseAcceptedByid });

//     console.log(lab);

//     if (!lab) {
//       return res.status(404).json({ success: false, message: 'Lab not found' });
//     }

//     // Find the booking by labId from the lab's bookings array
//     const booking = lab.bookings.find(b => b.labId === urgentCaseAcceptedByid);

//     if (!booking) {
//       return res.status(404).json({ success: false, message: 'Booking not found in the lab' });
//     }

//     // Check if OTP was provided
//     if (!otp) {
//       return res.status(400).json({ success: false, message: 'Please enter OTP' });
//     }

//     console.log(booking.bookingOtp);
//     // Check if the OTP matches
//     if (booking.bookingOtp !== otp) {
//       return res.status(400).json({ success: false, message: 'Invalid OTP' });
//     }

//     // OTP is valid
//     return res.status(200).json({ success: true, message: 'OTP verified successfully' });
//   } catch (error) {
//     console.error('Error checking OTP:', error);
//     return res.status(500).json({
//       success: false,
//       message: 'Failed to verify OTP',
//       error: error.message,
//     });
//   }
// };





// ✅ urgentOtpController.js (Controller)
import createUrgentCaseModel from '../../models/BOOKING/UrgentCaseModel.js';
import crypto from 'crypto';

// Send OTP to patient based on bookingId and type (start/end)
export const sendOtp = async (req, res) => {
  const { bookingId, type } = req.params;
  const UrgentCase = createUrgentCaseModel(req.conn1); // DRA DB

  console.log('Checking bookingId:', bookingId);
const debugDoc = await UrgentCase.findOne({ 'bookings.bookingId': bookingId });
console.log('Found for check:', debugDoc);


  try {
    const otp = crypto.randomInt(1000, 9999).toString();

    const result = await UrgentCase.findOneAndUpdate(
      { 'bookings.bookingId': bookingId },
      {
        $set: {
          [`bookings.$.${type === 'start' ? 'bookingOtpStart' : 'bookingOtpEnd'}`]: otp,
        },
      },
      { new: true }
    );

    console.log('result:', result);
    if (!result) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // TODO: Send OTP via SMS to patient result.bookings.find(b => b.bookingId === bookingId)?.mobileNumber

    res.status(200).json({ message: 'OTP sent successfully', otp });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// Verify OTP and update status
export const verifyOtp = async (req, res) => {
  const { bookingId, type } = req.params;
  const { otp } = req.body;

  const DRAUrgentCase = createUrgentCaseModel(req.conn1);
  const PWAUrgentCase = createUrgentCaseModel(req.conn2);

  try {
    const draDoc = await DRAUrgentCase.findOne({ 'bookings.bookingId': bookingId });
    if (!draDoc) return res.status(404).json({ message: "Booking not found in DRA" });

    const draBooking = draDoc.bookings.find(b => b.bookingId === bookingId);
    if (!draBooking) return res.status(404).json({ message: "Booking not found in DRA array" });

    const validOtp = type === 'start' ? draBooking.bookingOtpStart : draBooking.bookingOtpEnd;
    if (validOtp !== otp) return res.status(400).json({ message: "Invalid OTP" });

    if (type === 'start') {
      draBooking.serviceStartTime = new Date();
      draBooking.status = 'pending';
    } else {
      draBooking.serviceEndTime = new Date();
      draBooking.status = 'completed';

      const start = new Date(draBooking.serviceStartTime);
      const end = new Date(draBooking.serviceEndTime);
      const durationMs = end - start;
      const totalSeconds = Math.floor(durationMs / 1000);
      draBooking.timerData = {
        hours: Math.floor(totalSeconds / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60
      };
    }

    await draDoc.save();

    await PWAUrgentCase.updateOne(
      { 'bookings.bookingId': bookingId },
      {
        $set: {
          'bookings.$.status': draBooking.status,
          'bookings.$.serviceEndTime': draBooking.serviceEndTime || null,
          'bookings.$.timerData': draBooking.timerData || null,
        },
      }
    );

    return res.status(200).json({ message: `OTP verified and ${type} service updated successfully` });
  } catch (error) {
    console.error('OTP verification error:', error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Fetch timer details for a specific booking from DRA
export const getTimerData = async (req, res) => {
  const { bookingId } = req.params;
  const DRAUrgentCase = createUrgentCaseModel(req.conn1); // DRA DB

  try {
    const doc = await DRAUrgentCase.findOne({ 'bookings.bookingId': bookingId });
    if (!doc) return res.status(404).json({ message: 'Booking not found in DRA' });

    const booking = doc.bookings.find(b => b.bookingId === bookingId);
    if (!booking) return res.status(404).json({ message: 'Booking not found in array' });

    return res.status(200).json({
      bookingId,
      status: booking.status,
      serviceStartTime: booking.serviceStartTime,
      serviceEndTime: booking.serviceEndTime,
      timerData: booking.timerData || { hours: 0, minutes: 0, seconds: 0 },
    });
  } catch (error) {
    console.error('Timer fetch error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
