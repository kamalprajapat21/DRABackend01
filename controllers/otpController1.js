// // practice
// // backend/controllers/otpController.js

// import { generateOtp, verifyOtp } from '../services/otpService.js';
// import createOtp from '../models/Otp.js';
// import createTimer from '../models/Timer.js';
// import createUser from '../models/User.js';


// //rajcode

// //rajcode
// const phoneNumber = "123123"; // Hardcoded phone number for testing

// const timers = {};

// const createStopwatch = () => {
//   const User = createUser(req.conn1);
//   const Timer = createTimer(req.conn1);
//   const Otp = createOtp(req.conn1);
//   let interval;

//   const start = async () => {
//     if (interval) clearInterval(interval);

//     const timer = await Timer.findOneAndUpdate(
//       { phoneNumber },
//       { $set: { running: true, lastStartTime: new Date() }, $setOnInsert: { hours: 0, minutes: 0, seconds: 0 } },
//       { upsert: true, new: true }
//     );

//     interval = setInterval(async () => {
//       const currentTimer = await Timer.findOne({ phoneNumber });
//       if (!currentTimer.running) {
//         clearInterval(interval);
//         return;
//       }

//       currentTimer.seconds += 1;
//       if (currentTimer.seconds >= 60) {
//         currentTimer.seconds = 0;
//         currentTimer.minutes += 1;
//         if (currentTimer.minutes >= 60) {
//           currentTimer.minutes = 0;
//           currentTimer.hours += 1;
//         }
//       }
//       await currentTimer.save();
//     }, 1000);

//     timers[phoneNumber] = interval;
//   };

//   const stop = async () => {
//     const User = createUser(req.conn1);
//     const Timer = createTimer(req.conn1);
//     const Otp = createOtp(req.conn1);

//     clearInterval(interval);
//     const timer = await Timer.findOne({ phoneNumber });
//     if (timer && timer.running) {
//       timer.running = false;
//       await timer.save();
//     }
//   };

//   return { start, stop };
// };

// const sendOtp = async (req, res) => {
//   const User = createUser(req.conn1);
//   const Timer = createTimer(req.conn1);
//   const Otp = createOtp(req.conn1);
  
//   try {
//     const { otp, createdAt } = await generateOtp(phoneNumber);
//     res.status(200).json({ otp, createdAt });
//   } catch (err) {
//     console.error('Error during OTP generation:', err);
//     res.status(500).json({ msg: 'Error during OTP generation', error: err.message });
//   }
// };

// const checkOtp = async (req, res) => {
//   const User = createUser(req.conn1);
//   const Timer = createTimer(req.conn1);
//   const Otp = createOtp(req.conn1);
//   const { otp } = req.body; // Assuming phoneNumber and otp are sent in the request body
//   try {
//     const isValid = await verifyOtp(phoneNumber, otp);
//     console.log(otp)
//     if (isValid) {
//       const timer = await Timer.findOne({ phoneNumber });
//       const stopwatch = createStopwatch();

//       if (timer && timer.running) {
//         await stopwatch.stop();
//         res.status(200).json({ message: 'OTP verified successfully. Stopwatch stopped.' });
//       } else {
//         await stopwatch.start();
//         res.status(200).json({ message: 'OTP verified successfully. Stopwatch started.', verifiedAt: new Date() });
//       }

//       // Remove OTP from the database for the verified phone number
//       await Otp.findOneAndDelete({ phoneNumber, otp }); // Ensure to match phoneNumber and otp
//     } else {
//       res.status(400).json({ message: 'Invalid OTP' });
//     }
//   } catch (error) {
//     console.error('Error during OTP verification:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// export { sendOtp, checkOtp };


// // import BookingModel from '../models/BookingModel'; // Adjust the path as needed
// import createLab from '../models/BOOKING/Lab.js'; // Adjust the path based on your project structure
// import crypto from 'crypto';

// // Function to send OTP
// export const sendOtp = async (req, res) => {
//   try {
//     const Lab = createLab(req.conn1);
//     const _id = req.params;
//     console.log(_id)
//     const otp = crypto.randomInt(100000, 999999); // Generate a 6-digit OTP
//     const booking = await Lab.findByIdAndUpdate(
//       _id,
//       { bookingOtp: otp },
//       { new: true }
//     );
    
//     if (!booking) return res.status(404).json({ message: 'Booking not found' });
    
//     // Send OTP to user's mobile number
//     // Implement your OTP sending logic here (e.g., via SMS service)
    
//     res.status(200).json({ message: 'OTP sent successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Function to check OTP
// export const checkOtp = async (req, res) => {
//   try {
//     const { _id } = req.params;
//     const { otp } = req.body;
    
//     const booking = await Lab.findById(_id);
    
//     if (!booking) return res.status(404).json({ message: 'Booking not found' });
//     if (booking.bookingOtp !== otp) return res.status(400).json({ message: 'Invalid OTP' });
    
//     // OTP is valid
//     res.status(200).json({ message: 'OTP verified successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


// export const sendOtp = async (req, res) => {
  //   try {
    //     const Lab = createLab(req.conn1);
    //     const { labId } = req.params; // Get the booking ID from the request parameters
    
    //     // Generate a 6-digit OTP
    //     const otp = crypto.randomInt(100000, 999999);
    //     console.log(Lab,labId,otp)
    //     // Find the lab that contains the booking with the given ID
    //     // const objectId = mongoose.Types.ObjectId(id);
    
    //     // Find the lab that contains the booking with the given ID
    //     // const lab = await Lab.findOne({ 'bookings._id': labId });
    //     const lab = Lab.bookings.findOne(b => b.labId === labId);
    
    //     console.log(lab)
    //     if (!lab) {
      //       return res.status(404).json({ message: 'Lab not found' });
      //     }
      
      //     // Find the booking by ID from the lab's bookings array
      //     // const booking = lab.bookings.id(id);
      
      //     if (!booking) {
        //       return res.status(404).json({ message: 'Booking not found in the lab' });
        //     }
        
        //     // Update the booking's OTP
        //     booking.bookingOtp = otp;
        //     await lab.save(); // Save changes to the lab document
        
        //     // Send OTP to the user's mobile number
        //     // Implement your OTP sending logic here (e.g., via SMS service)
        
        //     res.status(200).json({ message: 'OTP sent successfully' });
        //   } catch (error) {
          //     console.error('Error sending OTP:', error);
          //     res.status(500).json({
            //       success: false,
            //       message: 'Failed to send OTP',
            //       error: error.message,
            //     });
            //   }
            // };
            
            // import createLab from '../models/BOOKING/Lab.js'; // Adjust the path based on your project structure
            // import crypto from 'crypto';
            
// import createLab from '../models/BOOKING/Lab.js'; // Adjust the path based on your project structure
// import mongoose from 'mongoose';
// import crypto from 'crypto';
// export const sendOtp = async (req, res) => {
//   try {
//     const Lab = createLab(req.conn2); // Get the Lab model from the db connection
//     const { labId } = req.params; // Get the booking ID from the request parameters
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
//   { 'bookings.labId': labId },  // Find the booking with the specified labId
//   { $set: { 'bookings.$.bookingOtp': otp } },  // Update the bookingOtp field for that booking
//   { new: true }  // Return the updated document
// );

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
//     const { labId } = req.params;
//     const { otp } = req.body;

//     // Find the lab document that contains the booking with the given labId
//     const lab = await Lab.findOne({ 'bookings.labId': labId });

//     if (!lab) {
//       return res.status(404).json({ success: false, message: 'Lab not found' });
//     }

//     // Find the booking by labId from the lab's bookings array
//     const booking = lab.bookings.find(b => b.labId === labId);

//     if (!booking) {
//       return res.status(404).json({ success: false, message: 'Booking not found in the lab' });
//     }

//     // Check if OTP was provided
//     if (!otp) {
//       return res.status(400).json({ success: false, message: 'Please enter OTP' });
//     }

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






import createLab from '../models/BOOKING/VaccinationModel.js'; // Adjust the path based on your project structure
import mongoose from 'mongoose';
import crypto from 'crypto';
export const sendOtp = async (req, res) => {
  try {
    const Lab = createLab(req.conn2); // Get the Lab model from the db connection
    const { draId } = req.params; // Get the booking ID from the request parameters
    const otp = crypto.randomInt(1000, 9999);
    // const lab = await Lab.findOne({ 'bookings.labId': labId });
    // const booking = lab.bookings.find(b => b.labId === labId);
    console.log("test1")
    // console.log(booking)
    console.log("test1")

    res.status(200).json({ message: 'OTP sent successfully', otp });

    //rajcode
// rajcode
  const booking = await Lab.findOneAndUpdate(
  { 'bookings.labId': draId },  // Find the booking with the specified labId
  { $set: { 'bookings.$.bookingOtp': otp } },  // Update the bookingOtp field for that booking
  { new: true }  // Return the updated document
);

    //rajcode
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send OTP',
      error: error.message,
    });
  }
};


export const checkOtp = async (req, res) => {
  try {
    const Lab = createLab(req.conn2);
    const { draId } = req.params;
    const { otp } = req.body;

    // Find the lab document that contains the booking with the given draId
    const lab = await Lab.findOne({ 'bookings.draId': draId });

    if (!lab) {
      return res.status(404).json({ success: false, message: 'Lab not found' });
    }

    // Find the booking by labId from the lab's bookings array
    const booking = lab.bookings.find(b => b.draId === draId);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found in the lab' });
    }

    // Check if OTP was provided
    if (!otp) {
      return res.status(400).json({ success: false, message: 'Please enter OTP' });
    }

    console.log(booking.bookingOtp);

    // Check if the OTP matches
    if (booking.bookingOtp !== otp) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    // OTP is valid
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
