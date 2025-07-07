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
