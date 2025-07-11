// controllers/urgentCaseController.js
import mongoose from 'mongoose';
import getUrgentCaseModel from '../../models/BOOKING/UrgentCaseModel.js';


export const getAvailableUrgentCases = async (req, res) => {
  try {
    const { draId } = req.params;
    const PwaUrgentCaseModel = req.conn2.model('UrgentCase');

    const cases = await PwaUrgentCaseModel.find({
      'bookings.status': 'incoming',
      'bookings.draRejectedBy': { $ne: draId },
    });

    // Filter individual bookings in each urgent case
    const filteredCases = cases.map((urgentCase) => {
      const filteredBookings = urgentCase.bookings.filter(
        (b) => b.status === 'incoming' && !b.draRejectedBy.includes(draId)
      );
      return {
        ...urgentCase.toObject(),
        bookings: filteredBookings,
      };
    }).filter(uc => uc.bookings.length > 0);

    res.json(filteredCases);
  } catch (error) {
    console.error('Error fetching urgent cases:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const rejectUrgentCase = async (req, res) => {
  try {
    const { draId, bookingId } = req.body;
    const PwaUrgentCaseModel = req.conn2.model('UrgentCase');

    const urgentCase = await PwaUrgentCaseModel.findOne({ 'bookings.bookingId': bookingId });
    if (!urgentCase) return res.status(404).json({ error: 'Booking not found' });

    const booking = urgentCase.bookings.find((b) => b.bookingId === bookingId);
    if (!booking) return res.status(404).json({ error: 'Booking not found inside document' });

    if (!booking.draRejectedBy.includes(draId)) {
      booking.draRejectedBy.push(draId);
    }

    await urgentCase.save();
    res.json({ message: 'Booking rejected for this DRA.' });
  } catch (error) {
    console.error('Error rejecting urgent case:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};







// ✅ Make sure this import is correct
import createUrgentCaseModel from '../../models/BOOKING/UrgentCaseModel.js';

export const acceptUrgentCase = async (req, res) => {
  try {
    const { draId, bookingId } = req.body;

    // ✅ Register model for each connection
    createUrgentCaseModel(req.conn1); // For DRA DB
    createUrgentCaseModel(req.conn2); // For PWA DB

    // ✅ Now you can use the models
    const PwaUrgentCaseModel = req.conn2.model('UrgentCase'); // PWA DB
    const DraUrgentCaseModel = req.conn1.model('UrgentCase'); // DRA DB

    // 1. Find urgent case with the booking
    const urgentCase = await PwaUrgentCaseModel.findOne({ 'bookings.bookingId': bookingId });
    if (!urgentCase) return res.status(404).json({ error: 'Booking not found' });

    // 2. Find the specific booking
    const booking = urgentCase.bookings.find((b) => b.bookingId === bookingId);
    if (!booking) return res.status(404).json({ error: 'Booking not found inside document' });

    // 3. Update status in PWA
    booking.urgentCaseAcceptedByid = draId;
    booking.status = 'pending';
    await urgentCase.save();

    // 4. Save accepted booking to DRA DB
    const draUrgentCase = new DraUrgentCaseModel({
      userId: urgentCase.userId,
      bookings: [booking],
    });

    await draUrgentCase.save();

    res.json({ message: 'Booking accepted and stored in DRA DB.' });

  } catch (error) {
    console.error('Error accepting urgent case:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// export const getIncomingUrgentBookings = async (req, res) => {
//   try {
//     const PwaUrgentCaseModel = req.conn2.model('UrgentCase');

//     // Fetch all urgent cases with incoming bookings
//     const urgentCases = await PwaUrgentCaseModel.find({
//       'bookings.status': 'incoming'
//     }).lean();

//     // Flatten all incoming bookings
//     const incomingBookings = [];
    
//     for (const urgentCase of urgentCases) {
//       for (const booking of urgentCase.bookings) {
//         if (booking.status === 'incoming') {
//           incomingBookings.push({
//             bookingId: booking.bookingId,
//             patientName: booking.patientName,
//             patientAge: booking.patientAge,
//             symptoms: booking.symptoms,
//             patientsNote: booking.patientsNote,
//             urgentCharges: booking.urgentCharges,
//             status: booking.status,
//             createdAt: booking.createdAt,
//             draRejectedBy: booking.draRejectedBy || [],
//             userId: urgentCase.userId
//           });
//         }
//       }
//     }

//     res.json({
//       success: true,
//       count: incomingBookings.length,
//       bookings: incomingBookings
//     });
//   } catch (error) {
//     console.error('Error fetching incoming urgent bookings:', error);
//     res.status(500).json({ 
//       success: false,
//       error: 'Internal Server Error' 
//     });
//   }
// };

// controllers/getIncomingUrgentBookings.js
// import createUrgentCaseModel from "../models/UrgentCaseModel.js";

export const getIncomingUrgentBookings = async (req, res) => {
  try {
    // Register model on conn2 if not already
    createUrgentCaseModel(req.conn2);
    const PwaUrgentCaseModel = req.conn2.model('UrgentCase');

    // Find all urgent cases where at least one booking has status 'incoming'
    const urgentCases = await PwaUrgentCaseModel.find({ 
      "bookings.status": "incoming"
    }).select("userId bookings"); 

    // Flatten and filter incoming bookings
    const incomingBookings = urgentCases.flatMap(urgentCase =>
      urgentCase.bookings.filter(booking => booking.status === "incoming")
        .map(booking => ({
          ...booking.toObject(),
          userId: urgentCase.userId   // attach userId
        }))
    );

    return res.status(200).json({
      success: true,
      count: incomingBookings.length,
      data: incomingBookings,
    });

  } catch (error) {
    console.error("Error fetching incoming urgent bookings:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching incoming urgent bookings",
    });
  }
};

