// //backend/controllers/earningController.js
// //practice
// // backend/controllers/earningController.js

// import mongoose from 'mongoose';
// import createUser from '../models/User.js';
// import createUserBookings from '../models/BookingforUrgent.js';
// import createEarning from '../models/Earning.js';

// export const getEarnings = async (req, res) => {
//   const User = createUser(req.conn1);
//   const UserBookings = createUserBookings(req.conn1);
//   const Earning = createEarning(req.conn1);

//   const { phoneNumber } = req.body;
//   console.log(phoneNumber);

//   try {
//     const user = await User.findOne({ mobile: phoneNumber });
//     if (!user) {
//       console.log('Alert: User not found');
//       return res.status(404).send('User not found');
//     }

//     const userBookings = await UserBookings.findOne({ userId: user._id }).populate('userId');
//     if (!userBookings) {
//       console.log('Alert: No bookings found for this user');
//       return res.status(404).send('No bookings found for this user');
//     }

//     const completedBookings = userBookings.bookings.filter(booking => booking.status === 'Completed');
//     const totalCompletedBookings = completedBookings.length;
//     const totalEarnings = completedBookings.reduce((sum, booking) => sum + booking.charges, 0);

//     // Fetch the current earning document
//     let earning = await Earning.findOne({ userId: user._id });

//     if (!earning) {
//       // If no earning document exists, create a new one
//       earning = new Earning({
//         userId: user._id,
//         totalCompletedBookings,
//         totalEarnings,
//         availableBalance: totalEarnings
//       });
//     } else {
//       // If earning document exists, update it
//       const earningIncrease = totalEarnings - earning.totalEarnings;
//       earning.totalCompletedBookings = totalCompletedBookings;
//       earning.totalEarnings = totalEarnings;
//       earning.availableBalance += earningIncrease;
//     }

//     // Save the updated or new earning document
//     await earning.save();

//     res.json({
//       totalCompletedBookings: earning.totalCompletedBookings,
//       totalEarnings: earning.totalEarnings,
//       availableBalance: earning.availableBalance
//     });
//   } catch (error) {
//     console.log('Alert: Server error', error.message);
//     res.status(500).send(error);
//   }
// };
//backend/controllers/earningController.js
//practice
// backend/controllers/earningController.js

// //modifications for earning from PWA
// import mongoose from 'mongoose';
// // import createUser from '../models/User.js';
// import createUser from '../models/User1.js';
// // import createUserBookings from '../models/BookingforUrgent.js';
// import createLab from '../models/BOOKING/Lab.js';
// import createEarning from '../models/Earning.js';
// // import createLab from '../models/BOOKING/Lab.js';

// export const getEarnings = async (req, res) => {
//   const User = createUser(req.conn1);
//   const LabModel = createLab(req.conn2);
//   // const UserBookings = createLab(req.conn1);
//   // const LabModel = createLab(req.conn2);
//   const Earning = createEarning(req.conn1);
//   try {
//     const { labownermobile } = req.body; // Extract labownermobile from the request body

//     console.log(`Fetching earnings for lab owner mobile: ${labownermobile}`);


//     // Find bookings where labownermobile matches and status is pending
//     const labs = await LabModel.find({}); // Retrieve all labs

//     // Filter and flatten the pending bookings
//     const pendingBookings = labs.reduce((acc, lab) => {
//       const labPendingBookings = lab.bookings.filter(booking => 
//         booking.labownermobile === labownermobile && booking.status === 'completed'
//       );
//       return acc.concat(labPendingBookings || []);
//     }, []);

//   console.log(pendingBookings)

//     if (!pendingBookings.length) {
//       return res.status(404).json({ message: 'No completed bookings found for this lab owner.' });
//     }

//     //earnings concept

//     // const completedBookings = userBookings.bookings.filter(booking => booking.status === 'completed');
//     const completedBookings = pendingBookings.filter(booking => booking.status === 'completed');
//     const totalCompletedBookings = completedBookings.length;
//     const totalEarnings = completedBookings.reduce((sum, booking) => sum + booking.charges, 0);

//     // Fetch the current earning document
//     let earning = await Earning.findOne({ labownermobile: User.mobile });

//     if (!earning) {
//       // If no earning document exists, create a new one
//       earning = new Earning({
//         labownermobile: User.mobile,
//         totalCompletedBookings,
//         totalEarnings,
//         availableBalance: totalEarnings
//       });
//     } else {
//       // If earning document exists, update it
//       const earningIncrease = totalEarnings - earning.totalEarnings;
//       earning.totalCompletedBookings = totalCompletedBookings;
//       earning.totalEarnings = totalEarnings;
//       earning.availableBalance += earningIncrease;
//     }

//     // Save the updated or new earning document
//     await earning.save();

//     res.json({
//       totalCompletedBookings: earning.totalCompletedBookings,
//       totalEarnings: earning.totalEarnings,
//       availableBalance: earning.availableBalance
//     });
//   } catch (error) {
//     console.log('Alert: Server error', error.message);
//     res.status(500).send(error);
//   }
// };

// // only have problem wth 
// import mongoose from 'mongoose';
// import createUser from '../models/User1.js';
// import createLab from '../models/BOOKING/Lab.js';
// import createEarning from '../models/Earning.js';
// // import createUser from '../models/User.js';
// // import createUserBookings from '../models/BookingforUrgent.js';
// // import createLab from '../models/BOOKING/Lab.js';

// export const getEarnings = async (req, res) => {
//   const User = createUser(req.conn1);
//   const LabModel = createLab(req.conn2);
//   const Earning = createEarning(req.conn1);

//   try {
//     // const { labownermobile } = req.body; // Extract labownermobile from the request body
//     const {phoneNumber} = req.body;
//     const labownermobile = phoneNumber
//     console.log(`Fetching earnings for lab owner mobile: ${labownermobile}`);

//     // Find bookings where labownermobile matches and status is completed
//     const labs = await LabModel.find({}); // Retrieve all labs

//     // Filter and flatten the completed bookings
//     const completedBookings = labs.reduce((acc, lab) => {
//       const labCompletedBookings = lab.bookings.filter(booking => 
//         booking.labownermobile === labownermobile && booking.status === 'completed'
//       );
//       return acc.concat(labCompletedBookings || []);
//     }, []);

//     // console.log(completedBookings);

//     if (!completedBookings.length) {
//       return res.status(404).json({ message: 'No completed bookings found for this lab owner.' });
//     }

//     // Calculate total completed bookings and earnings safely
//     const totalCompletedBookings = completedBookings.length;
//     console.log(totalCompletedBookings)
//     // const totalEarnings = completedBookings.reduce((sum, booking) => {
//     //   // Ensure booking.charges is a number, default to 0 if not
//     //   const charges = typeof booking.charges === 'number' && booking.charges > 0 ? booking.charges : 0;
//     //   return sum + charges;
//     // }, 0);

// const totalEarnings = completedBookings.reduce((sum, booking) => {
//   const dhaCharge = booking.dhaCharge || 0; // Ensure dhaCharge is a number
//   return sum + dhaCharge;
// }, 0);

//     // Fetch the current earning document
//     let earning = await Earning.findOne({ labownermobile });

//     if (!earning) {
//       // If no earning document exists, create a new one
//       earning = new Earning({
//         labownermobile,
//         totalCompletedBookings,
//         totalEarnings,
//         availableBalance: totalEarnings // Initially, available balance is the same as total earnings
//       });
//     } else {
//       // If earning document exists, update it
//       const earningIncrease = totalEarnings - earning.totalEarnings;
//       earning.totalCompletedBookings = totalCompletedBookings;
//       earning.totalEarnings = totalEarnings;
//       earning.availableBalance += earningIncrease;
//     }

//     // Save the updated or new earning document
//     await earning.save();

//     res.json({
//       totalCompletedBookings: earning.totalCompletedBookings,
//       totalEarnings: earning.totalEarnings,
//       availableBalance: earning.availableBalance
//     });
//   } catch (error) {
//     console.log('Alert: Server error', error.message);
//     res.status(500).send(error);
//   }
// };






// import createEarning from '../models/Earning.js';
// import createLab from '../models/BOOKING/UrgentCaseModel.js';

// export const getEarnings = async (req, res) => {
//   const Earning = createEarning(req.conn1);
//   const UrgentCase = createLab(req.conn2);

//   // const { phoneNumber, serviceType } = req.body; // e.g., "UrgentCase", "HomeCare"
//   const { draId, serviceType } = req.body;


//   try {
//     const allRecords = await UrgentCase.find({});

//     const completedBookings = allRecords.flatMap(record =>
//       record.bookings.filter(b =>
//         b.status === 'completed' &&
//         b.serviceType === serviceType &&
//         b.urgentCaseAcceptedByid === draId
//       )
//     );

//     const totalEarnings = completedBookings.reduce((sum, b) => sum + (b.urgentCharges || 0), 0);
//     const totalCompleted = completedBookings.length;

//     let earning = await Earning.findOne({ draId });

//     if (!earning) {
//       earning = new Earning({
//         draId,
//         totalEarnings,
//         availableBalance: totalEarnings,
//         history: completedBookings.map(b => ({
//           patientName: b.patientName,
//           amount: b.urgentCharges,
//           serviceType: b.serviceType
//         }))
//       });
//     } else {
//       const newEarnings = totalEarnings - earning.totalEarnings;
//       earning.totalEarnings = totalEarnings;
//       earning.availableBalance += newEarnings;
//       earning.totalCompletedBookings = totalCompleted;

//       completedBookings.forEach(b => {
//         const exists = earning.history.some(
//           h => h.bookingId === b.bookingId
//         );
//         if (!exists) {
//           earning.history.push({
//             patientName: b.patientName,
//             amount: b.urgentCharges,
//             serviceType: b.serviceType,
//             bookingId: b.bookingId
//           });
//         }
//       });
//     }

//     await earning.save();

//     res.json({
//       message: 'Earning data updated',
//       totalEarnings: earning.totalEarnings,
//       availableBalance: earning.availableBalance,
//       history: earning.history
//     });

//   } catch (error) {
//     console.error('Error in earnings:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };








// /////**********Workingcode */
// import createUrgentCaseModel from "../models/BOOKING/UrgentCaseModel.js";
// import createEarningModel from "../models/Earning.js";

// export const getAvailable = async (req, res) => {
//   const { draId } = req.body;
//   const Earning = createEarningModel(req.conn1);

//   try {
//     const record = await Earning.findOne({ draId });

//     if (!record) {
//       return res.status(404).json({ message: "No earnings record found." });
//     }

//     res.json({
//       availableBalance: record.availableBalance,
//     });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch available balance." });
//   }
// };

// export const getHistory = async (req, res) => {
//   const { draId } = req.body;
//   const UrgentCase = createUrgentCaseModel(req.conn1);

//   try {
//     const records = await UrgentCase.find({ "bookings.urgentCaseAcceptedByid": draId });

//     const allBookings = records.flatMap(doc =>
//       doc.bookings.filter(b => b.urgentCaseAcceptedByid === draId && b.status === "completed")
//     );

//     const history = allBookings.map(booking => ({
//       patientName: booking.patientName,
//       serviceType: booking.serviceType,
//       amount: booking.urgentCharges,
//       completedAt: booking.serviceEndTime || booking.createdAt,
//     }));

//     res.json({ history });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch earning history." });
//   }
// };

// export const getEarnings = async (req, res) => {
//   const { draId } = req.body;
//   const UrgentCase = createUrgentCaseModel(req.conn1);
//   const Earning = createEarningModel(req.conn1);

//   try {
//     const records = await UrgentCase.find({ "bookings.urgentCaseAcceptedByid": draId });

//     const allBookings = records.flatMap(doc =>
//       doc.bookings.filter(b => b.urgentCaseAcceptedByid === draId && b.status === "completed")
//     );

//     const totalCompletedBookings = allBookings.length;
//     const totalEarnings = allBookings.reduce((sum, b) => sum + (b.urgentCharges || 0), 0);

//     let earning = await Earning.findOne({ draId });

//     if (!earning) {
//       earning = new Earning({
//         draId,
//         totalCompletedBookings,
//         totalEarnings,
//         availableBalance: totalEarnings,
//       });
//     } else {
//       const earningIncrease = totalEarnings - earning.totalEarnings;
//       earning.totalCompletedBookings = totalCompletedBookings;
//       earning.totalEarnings = totalEarnings;
//       earning.availableBalance += earningIncrease;
//     }

//     await earning.save();

//     res.json({
//       totalCompletedBookings,
//       totalEarnings,
//       availableBalance: earning.availableBalance,
//     });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to calculate total earnings." });
//   }
// };





import createEarningModel  from '../models/Earning.js';

/**
 * Add new earning entry for a DRA.
 * Called when a case is completed.
 */
// export const addEarning = async (req, res) => {
//   try {
//     const { draId, amount, serviceName, bookingId } = req.body;

//     let earning = await Earning.findOne({ draId });

//     const newHistory = {
//       amount,
//       serviceName,
//       date: new Date(),
//       bookingId
//     };

//     if (!earning) {
//       earning = new Earning({
//         draId,
//         totalEarnings: amount,
//         redeemedAmount: amount,
//         totalCases: 1,
//         history: [newHistory],
//         withdrawalHistory: []
//       });
//     } else {
//       earning.totalEarnings += amount;
//       earning.redeemedAmount += amount;
//       earning.totalCases += 1;
//       earning.history.push(newHistory);
//     }

//     await earning.save();
//     res.status(200).json({ message: 'Earning updated successfully', earning });
//   } catch (error) {
//     console.error('Error adding earning:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };


// import createEarningModel from '../models/EarningModel.js'; // ✅ make sure this is correct

// import createEarningModel from '../models/EarningModel.js';
import createUrgentCaseModel from '../models/BOOKING/UrgentCaseModel.js';
import createVaccinationModel from '../models/BOOKING/VaccinationModel.js';
import createHomeCareModel from '../models/BOOKING/Home.js';
import createPwaNursingModel from '../models/BOOKING/NursingModel.js';

// export const addEarning = async (req, res) => {
//   try {
//     const { draId, amount, serviceName, bookingId } = req.body;

//     const Earning = createEarningModel(req.conn1);

//     // STEP 1: Verify booking exists in correct service
//     let bookingExists = false;

//     if (serviceName === 'Urgent') {
//       const Urgent = createUrgentCaseModel(req.conn1);
//       const doc = await Urgent.findOne({ 'bookings.bookingId': bookingId, 'bookings.urgentCaseAcceptedByid': draId });
//       bookingExists = !!doc;
//     } else if (serviceName === 'Vaccination') {
//       const Vaccination = createVaccinationModel(req.conn1);
//       const doc = await Vaccination.findOne({ 'bookings.bookingId': bookingId, 'bookings.draId': draId });
//       bookingExists = !!doc;
//     } else if (serviceName === 'HomeCare') {
//       const Home = createHomeCareModel(req.conn1);
//       const doc = await Home.findOne({ 'bookings.bookingId': bookingId, 'bookings.draId': draId });
//       bookingExists = !!doc;
//     } else if (serviceName === 'Nursing') {
//       const Nursing = createPwaNursingModel(req.conn1);
//       const doc = await Nursing.findOne({ 'bookings.bookingId': bookingId, 'bookings.draId': draId });
//       bookingExists = !!doc;
//     } else {
//       return res.status(400).json({ message: 'Invalid service name' });
//     }

//     if (!bookingExists) {
//       return res.status(404).json({ message: 'Booking not found for given draId in specified service' });
//     }

//     // STEP 2: Proceed with earning logic
//     const newHistory = {
//       amount,
//       serviceName,
//       date: new Date(),
//       bookingId,
//     };

//     let earning = await Earning.findOne({ draId });

//     if (!earning) {
//       earning = new Earning({
//         draId,
//         totalEarnings: amount,
//         redeemedAmount: amount,
//         totalCases: 1,
//         history: [newHistory],
//         withdrawalHistory: [],
//       });
//     } else {
//       earning.totalEarnings += amount;
//       earning.redeemedAmount += amount;
//       earning.totalCases += 1;
//       earning.history.push(newHistory);
//     }

//     await earning.save();

//     res.status(200).json({ message: 'Earning updated successfully', earning });
//   } catch (error) {
//     console.error('Error adding earning:', error);
//     res.status(500).json({ message: 'Internal Server Error', error: error.message });
//   }
// };

export const addEarning = async (req, res) => {
  try {
    const { draId, amount, serviceName, bookingId } = req.body;

    const Earning = createEarningModel(req.conn1);

    let bookingExists = false;

    // Function to check if a completed booking exists
    const checkBookingCompleted = (doc, idKey) => {
      if (!doc || !doc.bookings) return false;
      const booking = doc.bookings.find(
        (b) => b.bookingId === bookingId && b[idKey] === draId && b.status === 'completed'
      );
      return !!booking;
    };

    if (serviceName === 'Urgent') {
      const Urgent = createUrgentCaseModel(req.conn1);
      const doc = await Urgent.findOne({ 'bookings.bookingId': bookingId });
      bookingExists = checkBookingCompleted(doc, 'urgentCaseAcceptedByid');
    } else if (serviceName === 'Vaccination') {
      const Vaccination = createVaccinationModel(req.conn1);
      const doc = await Vaccination.findOne({ 'bookings.bookingId': bookingId });
      bookingExists = checkBookingCompleted(doc, 'draId');
    } else if (serviceName === 'HomeCare') {
      const Home = createHomeCareModel(req.conn1);
      console.log(Home);
      console.log(bookingId);
      const doc = await Home.findOne({ 'bookings.bookingId': bookingId });
      console.log(doc);
      bookingExists = checkBookingCompleted(doc, 'draId');
      console.log(bookingExists);
    } else if (serviceName === 'Nursing') {
      const Nursing = createPwaNursingModel(req.conn1);
      const doc = await Nursing.findOne({ 'bookings.bookingId': bookingId });
      bookingExists = checkBookingCompleted(doc, 'draId');
    } else {
      return res.status(400).json({ message: 'Invalid service name' });
    }

    
    if (!bookingExists) {
      return res.status(404).json({ message: 'Booking not found or not completed for given draId in specified service' });
    }

    // ✅ STEP 2: Proceed with earning logic
    const newHistory = {
      amount,
      serviceName,
      date: new Date(),
      bookingId,
    };

    let earning = await Earning.findOne({ draId });

    if (!earning) {
      earning = new Earning({
        draId,
        totalEarnings: amount,
        redeemedAmount: amount,
        totalCases: 1,
        history: [newHistory],
        withdrawalHistory: [],
      });
    } else {
      earning.totalEarnings += amount;
      earning.redeemedAmount += amount;
      earning.totalCases += 1;
      earning.history.push(newHistory);
    }

    await earning.save();

    res.status(200).json({ message: 'Earning updated successfully', earning });
  } catch (error) {
    console.error('Error adding earning:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};



/**
 * Get earnings and history for a specific DRA.
 */
// export const getEarnings = async (req, res) => {
//   try {
//     const { draId } = req.params;
//     const record = await Earning.findOne({ draId });

//     if (!record) {
//       return res.status(404).json({ message: 'Earning record not found' });
//     }

//     res.status(200).json(record);
//   } catch (error) {
//     console.error('Error fetching earnings:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// import createEarningModel from '../models/earningModel.js'; // adjust path if needed

export const getEarnings = async (req, res) => {
  try {
    const { draId } = req.params;
    const Earning = createEarningModel(req.conn1); // Make sure DB connection is injected

    const record = await Earning.findOne({ draId });

    if (!record) {
      return res.status(404).json({ message: 'No earnings found for this DRA ID' });
    }

    res.status(200).json({
      draId: record.draId,
      totalEarnings: record.totalEarnings,
      redeemedAmount: record.redeemedAmount,
      totalCases: record.totalCases,
      history: record.history,
      withdrawalHistory: record.withdrawalHistory,
    });
  } catch (error) {
    console.error('Error fetching earnings:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};




/**
 * Withdraw money from DRA's redeemable balance.
 */
// export const withdrawAmount = async (req, res) => {
//   try {
//     const { draId, amount } = req.body;

//     const record = await Earning.findOne({ draId });

//     if (!record) {
//       return res.status(404).json({ message: 'Earning record not found' });
//     }

//     if (amount > record.redeemedAmount) {
//       return res.status(400).json({ message: 'Insufficient balance' });
//     }

//     // Subtract and log withdrawal
//     record.redeemedAmount -= amount;
//     record.withdrawalHistory.push({
//       amount,
//       date: new Date()
//     });

//     await record.save();

//     res.status(200).json({
//       message: 'Withdrawal successful',
//       remainingBalance: record.redeemedAmount
//     });
//   } catch (error) {
//     console.error('Error during withdrawal:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };



// export const getEarningHistory = async (req, res) => {
//   try {
//     const { draId } = req.params;

//     const Earning = createEarningModel(req.conn1); // DRA DB

//     const earning = await Earning.findOne({ draId });

//     if (!earning) {
//       return res.status(404).json({ message: 'No earning record found for this draId.' });
//     }

//     return res.status(200).json({
//       draId: earning.draId,
//       totalEarnings: earning.totalEarnings,
//       redeemedAmount: earning.redeemedAmount,
//       totalCases: earning.totalCases,
//       earningHistory: earning.history,
//       withdrawalHistory: earning.withdrawalHistory
//     });
//   } catch (error) {
//     console.error('Error fetching earning history:', error);
//     res.status(500).json({ message: 'Internal Server Error', error: error.message });
//   }
// };


// export const withdrawAmount = async (req, res) => {
//   try {
//     const { draId, amount } = req.body;

//     if (!draId || !amount || isNaN(amount) || amount <= 0) {
//       return res.status(400).json({ message: 'Invalid draId or amount' });
//     }

//     const Earning = createEarningModel(req.conn1); // Ensure correct DB model
//     const record = await Earning.findOne({ draId });

//     if (!record) {
//       return res.status(404).json({ message: 'Earning record not found' });
//     }

//     if (amount > record.redeemedAmount) {
//       return res.status(400).json({ message: 'Insufficient balance' });
//     }

//     // Subtract amount and log withdrawal
//     record.redeemedAmount -= amount;
//     record.withdrawalHistory.push({
//       amount,
//       date: new Date(),
//       status: 'withdrawn' // optional, for future tracking
//     });

//     await record.save();

//     return res.status(200).json({
//       message: 'Withdrawal successful',
//       remainingBalance: record.redeemedAmount,
//       updatedWithdrawalHistory: record.withdrawalHistory
//     });
//   } catch (error) {
//     console.error('Error during withdrawal:', error);
//     res.status(500).json({ message: 'Internal Server Error', error: error.message });
//   }
// };


export const withdrawAmount = async (req, res) => {
  try {
    const { draId, amount } = req.body;

    if (!draId || !amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: 'Invalid draId or amount' });
    }

    const Earning = createEarningModel(req.conn1); // Connect to DRA DB
    const record = await Earning.findOne({ draId });

    if (!record) {
      return res.status(404).json({ message: 'Earning record not found' });
    }

    // 💡 Check for minimum ₹100 balance after withdrawal
    if (record.redeemedAmount - amount < 100) {
      return res.status(400).json({
        message: 'You must maintain a minimum balance of ₹100 after withdrawal'
      });
    }

    // Subtract amount and log withdrawal
    record.redeemedAmount -= amount;
    record.withdrawalHistory.push({
      amount,
      date: new Date(),
      status: 'withdrawn' // Optional status field
    });

    await record.save();

    return res.status(200).json({
      message: 'Withdrawal successful',
      remainingBalance: record.redeemedAmount,
      updatedWithdrawalHistory: record.withdrawalHistory
    });
  } catch (error) {
    console.error('Error during withdrawal:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

export const getEarningHistory = async (req, res) => {
  try {
    const { draId } = req.params;

    const Earning = createEarningModel(req.conn1); // Inject DRA DB model

    const earning = await Earning.findOne({ draId });

    if (!earning) {
      return res.status(404).json({ message: 'No earning record found for this draId.' });
    }

    // Optional: Sort history arrays by date (newest first)
    const sortedEarningHistory = [...earning.history].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    const sortedWithdrawalHistory = [...earning.withdrawalHistory].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    // Optional: Format date to ISO (or another readable format)
    const formatDate = (date) => new Date(date).toISOString();

    const earningHistoryFormatted = sortedEarningHistory.map((entry) => ({
      ...entry._doc,
      date: formatDate(entry.date)
    }));

    const withdrawalHistoryFormatted = sortedWithdrawalHistory.map((entry) => ({
      ...entry._doc,
      date: formatDate(entry.date)
    }));

    return res.status(200).json({
      draId: earning.draId,
      totalEarnings: earning.totalEarnings,
      redeemedAmount: earning.redeemedAmount,
      totalCases: earning.totalCases,
      earningHistory: earningHistoryFormatted,
      withdrawalHistory: withdrawalHistoryFormatted
    });
  } catch (error) {
    console.error('Error fetching earning history:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};




export const getWithdrawalHistory = async (req, res) => {
  try {
    const { draId } = req.params;

    if (!draId) {
      return res.status(400).json({ message: 'draId is required' });
    }

    const Earning = createEarningModel(req.conn1); // DRA DB connection
    const earningRecord = await Earning.findOne({ draId });

    if (!earningRecord) {
      return res.status(404).json({ message: 'No earning record found for this draId' });
    }

    return res.status(200).json({
      draId: earningRecord.draId,
      withdrawalHistory: earningRecord.withdrawalHistory || []
    });
  } catch (error) {
    console.error('Error fetching withdrawal history:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};





// export const getCompletedBookingsByDraId = async (req, res) => {

//   try {
//     const { draId } = req.params;

//     const Urgent = createUrgentCaseModel(req.conn1);
//     const Vaccination = createVaccinationModel(req.conn1);
//     const Home = createHomeCareModel(req.conn1);
//     const Nursing = createPwaNursingModel(req.conn1);

//     // Fetch completed bookings from each service
//     const [urgentDoc, vaccDocs, homeDocs, nursingDocs] = await Promise.all([
//       Urgent.find({ 'bookings.urgentCaseAcceptedByid': draId, 'bookings.status': 'completed' }),
//       Vaccination.find({ 'bookings.draId': draId, 'bookings.status': 'completed' }),
//       Home.find({ 'bookings.draId': draId, 'bookings.status': 'completed' }),
//       Nursing.find({ 'bookings.draId': draId, 'bookings.status': 'completed' }),
//     ]);

//     // Extract completed bookings arrays
//     const urgentBookings = urgentDoc.flatMap(doc =>
//       doc.bookings.filter(b => b.urgentCaseAcceptedByid === draId && b.status === 'completed')
//         .map(b => ({ ...b.toObject(), service: 'Urgent' }))
//     );

//     const vaccinationBookings = vaccDocs.flatMap(doc =>
//       doc.bookings.filter(b => b.draId === draId && b.status === 'completed')
//         .map(b => ({ ...b.toObject(), service: 'Vaccination' }))
//     );

//     const homeBookings = homeDocs.flatMap(doc =>
//       doc.bookings.filter(b => b.draId === draId && b.status === 'completed')
//         .map(b => ({ ...b.toObject(), service: 'HomeCare' }))
//     );

//     const nursingBookings = nursingDocs.flatMap(doc =>
//       doc.bookings.filter(b => b.draId === draId && b.status === 'completed')
//         .map(b => ({ ...b.toObject(), service: 'Nursing' }))
//     );

//     // Combine all
//     const allCompleted = [
//       ...urgentBookings,
//       ...vaccinationBookings,
//       ...homeBookings,
//       ...nursingBookings
//     ];

//     res.status(200).json({ draId, total: allCompleted.length, bookings: allCompleted });
//   } catch (error) {
//     console.error('Error fetching completed bookings:', error);
//     res.status(500).json({ message: 'Internal Server Error', error: error.message });
//   }
// };





// export const getCompletedBookingsByDraId = async (req, res) => {
//   try {
//     const { draId } = req.params;

//     if (!draId) {
//       return res.status(400).json({ message: 'draId is required in params' });
//     }

//     const Urgent = createUrgentCaseModel(req.conn1);
//     const Vaccination = createVaccinationModel(req.conn1);
//     const Home = createHomeCareModel(req.conn1);
//     const Nursing = createPwaNursingModel(req.conn1);

//     // STEP 1: Check if draId exists in any collection
//     const [draExistsInUrgent, draExistsInVacc, draExistsInHome, draExistsInNursing] = await Promise.all([
//       Urgent.exists({ 'bookings.urgentCaseAcceptedByid': draId }),
//       Vaccination.exists({ 'bookings.draId': draId }),
//       Home.exists({ 'bookings.draId': draId }),
//       Nursing.exists({ 'bookings.draId': draId }),
//     ]);

//     if (!draExistsInUrgent && !draExistsInVacc && !draExistsInHome && !draExistsInNursing) {
//       return res.status(404).json({ message: 'No bookings found for this draId' });
//     }

//     // STEP 2: Fetch completed bookings from each service
//     const [urgentDoc, vaccDocs, homeDocs, nursingDocs] = await Promise.all([
//       Urgent.find({ 'bookings.urgentCaseAcceptedByid': draId, 'bookings.status': 'completed' }),
//       Vaccination.find({ 'bookings.draId': draId, 'bookings.status': 'completed' }),
//       Home.find({ 'bookings.draId': draId, 'bookings.status': 'completed' }),
//       Nursing.find({ 'bookings.draId': draId, 'bookings.status': 'completed' }),
//     ]);

//     const urgentBookings = urgentDoc.flatMap(doc =>
//       doc.bookings.filter(b => b.urgentCaseAcceptedByid === draId && b.status === 'completed')
//         .map(b => ({ ...b.toObject(), service: 'Urgent' }))
//     );

//     const vaccinationBookings = vaccDocs.flatMap(doc =>
//       doc.bookings.filter(b => b.draId === draId && b.status === 'completed')
//         .map(b => ({ ...b.toObject(), service: 'Vaccination' }))
//     );

//     const homeBookings = homeDocs.flatMap(doc =>
//       doc.bookings.filter(b => b.draId === draId && b.status === 'completed')
//         .map(b => ({ ...b.toObject(), service: 'HomeCare' }))
//     );

//     const nursingBookings = nursingDocs.flatMap(doc =>
//       doc.bookings.filter(b => b.draId === draId && b.status === 'completed')
//         .map(b => ({ ...b.toObject(), service: 'Nursing' }))
//     );

//     const allCompleted = [
//       ...urgentBookings,
//       ...vaccinationBookings,
//       ...homeBookings,
//       ...nursingBookings
//     ];

//     res.status(200).json({ draId, total: allCompleted.length, bookings: allCompleted });
//   } catch (error) {
//     console.error('Error fetching completed bookings:', error);
//     res.status(500).json({ message: 'Internal Server Error', error: error.message });
//   }
// };


export const getCompletedBookingsByDraId = async (req, res) => {
  try {
    const { draId } = req.params;

    if (!draId) {
      return res.status(400).json({ message: 'draId is required in params' });
    }

    const Urgent = createUrgentCaseModel(req.conn1);
    const Vaccination = createVaccinationModel(req.conn1);
    const Home = createHomeCareModel(req.conn1);
    const Nursing = createPwaNursingModel(req.conn1);

    const [urgentDocs, vaccDocs, homeDocs, nursingDocs] = await Promise.all([
      Urgent.find({ 'bookings.urgentCaseAcceptedByid': draId, 'bookings.status': 'completed' }),
      Vaccination.find({ 'bookings.draId': draId, 'bookings.status': 'completed' }),
      Home.find({ 'bookings.draId': draId, 'bookings.status': 'completed' }),
      Nursing.find({ 'bookings.draId': draId, 'bookings.status': 'completed' }),
    ]);

    const urgentCount = urgentDocs.reduce((acc, doc) =>
      acc + doc.bookings.filter(b => b.urgentCaseAcceptedByid === draId && b.status === 'completed').length
    , 0);

    const vaccinationCount = vaccDocs.reduce((acc, doc) =>
      acc + doc.bookings.filter(b => b.draId === draId && b.status === 'completed').length
    , 0);

    const homeCount = homeDocs.reduce((acc, doc) =>
      acc + doc.bookings.filter(b => b.draId === draId && b.status === 'completed').length
    , 0);

    const nursingCount = nursingDocs.reduce((acc, doc) =>
      acc + doc.bookings.filter(b => b.draId === draId && b.status === 'completed').length
    , 0);

    const totalCompleted = urgentCount + vaccinationCount + homeCount + nursingCount;

    res.status(200).json({ draId, totalCompletedBookings: totalCompleted });
  } catch (error) {
    console.error('Error counting completed bookings:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};




export const getCurrentMonthIncome = async (req, res) => {
  try {
    const { draId } = req.query;

    if (!draId) {
      return res.status(400).json({ message: 'draId is required' });
    }

    const Earning = createEarningModel(req.conn1);

    const record = await Earning.findOne({ draId });
    if (!record) {
      return res.status(404).json({ message: 'Earning record not found' });
    }

    const now = new Date();
    const currentMonth = now.getMonth();   // 0-indexed (0 = Jan, 5 = June)
    const currentYear = now.getFullYear();

    const start = new Date(currentYear, currentMonth, 1);  // 1st of current month
    const end = new Date(currentYear, currentMonth + 1, 1); // 1st of next month

    const earningsInMonth = record.history.filter(h =>
      new Date(h.date) >= start && new Date(h.date) < end
    );

    const total = earningsInMonth.reduce((sum, e) => sum + e.amount, 0);

    res.status(200).json({
      draId,
      month: currentMonth + 1, // For human-readable (1-12)
      year: currentYear,
      totalEarnings: total,
      history: earningsInMonth
    });
  } catch (error) {
    console.error('Error fetching current month income:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
