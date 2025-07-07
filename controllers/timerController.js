// // backend/controllers/timerController.js

// import Timer from '../models/Timer.js';

// // Controller function to fetch hours, minutes, seconds
// export const fetchTime = async (req, res) => {
//   try {
//     const User = createUser(req.conn1);
//     const Timer = createTimer(req.conn1);
//     const Otp = createOtp(req.conn1);
//     const phoneNumber = "123123"; // Hardcoded phone number for testing

//     // Fetch the timer document from the database
//     const timer = await Timer.findOne({ phoneNumber });

//     if (!timer) {
//       return res.status(404).json({ message: 'Timer not found' });
//     }

//     // Destructure the timer object to extract hours, minutes, seconds
//     const { hours, minutes, seconds } = timer;

//     res.status(200).json({ hours, minutes, seconds });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export default {fetchTime};

// //practice
// import createLab from '../models/BOOKING/Lab.js'; // Adjust the path based on your project structure

// export const updateTimerData = async (req, res) => {
//   try {
//     const Lab = createLab(req.conn2); // Get the Lab model from the db connection
//     const { labId } = req.params; // Get the booking ID from the request parameters
//     const { hours, minutes, seconds } = req.body; // Extract hours, minutes, seconds from request body

//     // Find the booking with the specified labId and update the timerData
//     const booking = await Lab.findOneAndUpdate(
//       { 'bookings.labId': labId },  // Find the booking with the specified labId
//       { 
//         $set: { 
//           'bookings.$.timerData': { hours, minutes, seconds } // Update the timerData fields
//         } 
//       },
//       { new: true }  // Return the updated document
//     );

//     if (!booking) {
//       return res.status(404).json({ message: 'Booking not found' });
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Timer data updated successfully',
//       updatedBooking: booking
//     });
//   } catch (error) {
//     console.error('Error updating timer data:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to update timer data',
//       error: error.message,
//     });
//   }
// };




/////DRA
//practice
import createLab from '../models/BOOKING/VaccinationModel.js'; // Adjust the path based on your project structure

export const updateTimerData = async (req, res) => {
  try {
    const Lab = createLab(req.conn2); // Get the Lab model from the db connection
    const { draId } = req.params; // Get the booking ID from the request parameters
    const { hours, minutes, seconds } = req.body; // Extract hours, minutes, seconds from request body

    // Find the booking with the specified draId and update the timerData
    const booking = await Lab.findOneAndUpdate(
      { 'bookings.draId': draId },  // Find the booking with the specified draId
      { 
        $set: { 
          'bookings.$.timerData': { hours, minutes, seconds } // Update the timerData fields
        } 
      },
      { new: true }  // Return the updated document
    );

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Timer data updated successfully',
      updatedBooking: booking
    });
  } catch (error) {
    console.error('Error updating timer data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update timer data',
      error: error.message,
    });
  }
};
