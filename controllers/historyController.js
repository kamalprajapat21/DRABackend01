// import createUser from '../models/User.js';
// import createUserBookings from '../models/BookingforUrgent.js';

// export const getHistory = async (req, res) => {
//   //rajcode
//   const User = createUser(req.conn1);
//   const UserBookings = createUserBookings(req.conn1);
//   // const Earning = createEarning(req.conn1);
//   //rajcode
//   const { phoneNumber } = req.body; // Destructure phoneNumber from req.body
//   console.log(phoneNumber);
//   try {
//     // Use mobile instead of phoneNumber in the findOne query
//     const user = await User.findOne({ mobile: phoneNumber });

//     if (!user) {
//       return res.status(404).send('User not found');
//     }

//     const userBookings = await UserBookings.findOne({ userId: user._id }).populate('userId');

//     if (!userBookings) {
//       return res.status(404).send('No bookings found for this user');
//     }

//     const completedBookings = userBookings.bookings
//       .filter(booking => booking.status === 'Completed')
//       .map(booking => ({
//         bookingId: booking.bookingId,
//         date: booking.date,
//         charges: booking.charges
//       }));

//     res.json(completedBookings);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };



// // import createUser from '../models/User.js';
// // import createUserBookings from '../models/BookingforUrgent.js';
// import mongoose from 'mongoose';
// import createUser from '../models/User1.js';
// import createLab from '../models/BOOKING/Lab.js';
// import createEarning from '../models/Earning.js';


// export const getHistory = async (req, res) => {
//   //rajcode
//   // const User = createUser(req.conn1);
//   // const UserBookings = createUserBookings(req.conn1);
//   const User = createUser(req.conn1);
//   const LabModel = createLab(req.conn2);
//   const Earning = createEarning(req.conn1);
//   // const Earning = createEarning(req.conn1);
//   //rajcode
//   const {phoneNumber} = req.body;
//   const labownermobile = phoneNumber;
//     // Use mobile instead of phoneNumber in the findOne query
//     const labs = await LabModel.find({}); // Retrieve all labs


//     const completedBookings = labs.reduce((acc, lab) => {
//       const labCompletedBookings = lab.bookings.filter(booking => 
//         booking.labownermobile === labownermobile && booking.status === 'completed'
//       ).map(booking => ({
//         bookingId: booking.bookingId,
//         date: booking.date,
//         charges: booking.charges
//       }));

//     }, []);


//     // const completedBookings = userBookings.bookings
//     //   .filter(booking => booking.status === 'Completed')
//     //   .map(booking => ({
//     //     bookingId: booking.bookingId,
//     //     date: booking.date,
//     //     charges: booking.charges
//     //   }));

//     res.json(completedBookings);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };


import mongoose from 'mongoose';
import createUser from '../models/User1.js';
import createLab from '../models/BOOKING/VaccinationModel.js';
import createEarning from '../models/Earning.js';

export const getHistory = async (req, res) => {
  const User = createUser(req.conn1);
  const LabModel = createLab(req.conn2);
  const Earning = createEarning(req.conn1);

  try {
    const { phoneNumber } = req.body;
    const labownermobile = phoneNumber;
    console.log(`Fetching history for lab owner mobile: ${labownermobile}`);

    // Retrieve all lab records from the Lab model
    const labs = await LabModel.find({});

    // Filter and extract completed bookings
    const completedBookings = labs.reduce((acc, lab) => {
      const labCompletedBookings = lab.bookings.filter(booking => 
        booking.labownermobile === labownermobile && booking.status === 'completed'
      ).map(booking => ({
        bookingId: booking.bookingId,
        date: booking.startDate,
        charges: booking.dhaCharge
      }));
      return acc.concat(labCompletedBookings);
    }, []);

    if (!completedBookings.length) {
      return res.status(404).json({ message: 'No completed bookings found for this lab owner.' });
    }

     console.log(completedBookings)
    // Send the list of completed bookings as the response
    res.json(completedBookings);
  } catch (error) {
    console.log('Alert: Server error', error.message);
    res.status(500).send(error);
  }
};
