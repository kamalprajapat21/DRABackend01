///Updated Code
// controllers/homeCareController.js
import createHomeCareModel from '../../models/BOOKING/Home.js';
// import createPwaHomeModel from '../models/BOOKING/PwaHomeBooking.js';
// import otpGenerator from 'otp-generator';
// Get available HomeCare bookings for a DRA (not yet accepted and not rejected)
export const getAvailableHomeCare = async (req, res) => {
  try {
    const { draId } = req.params;
    const HomeCareModel = createHomeCareModel(req.conn1); // From PWA

    console.log(HomeCareModel);
    const allDocs = await HomeCareModel.find({
      'bookings.status': 'incoming',
      'bookings.draRejectedBy': { $ne: draId },
    });

    const filtered = allDocs.map((doc) => {
      const filteredBookings = doc.bookings.filter(
        (b) => b.status === 'incoming' && !b.draRejectedBy?.includes(draId)
      );
      return { ...doc.toObject(), bookings: filteredBookings };
    }).filter(d => d.bookings.length > 0);

    res.json(filtered);
  } catch (error) {
    console.error('Error in getAvailableHomeCare:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Reject HomeCare booking
export const rejectHomeCare = async (req, res) => {
  try {
    const { draId, bookingId } = req.body;
    const HomeCareModel = createHomeCareModel(req.conn2); // PWA DB

    const doc = await HomeCareModel.findOne({ 'bookings.bookingId': bookingId });
    if (!doc) return res.status(404).json({ error: 'Booking not found' });

    const booking = doc.bookings.find((b) => b.bookingId === bookingId);
    if (!booking) return res.status(404).json({ error: 'Booking inside not found' });

    if (!booking.draRejectedBy?.includes(draId)) {
      booking.draRejectedBy = booking.draRejectedBy || [];
      booking.draRejectedBy.push(draId);
    }

    await doc.save();
    res.json({ message: 'Booking rejected for this DRA' });
  } catch (error) {
    console.error('Error in rejectHomeCare:', error);
    res.status(500).json({ error: 'Server error' });
  }
};





export const acceptHomeCare = async (req, res) => {
  try {
    const { draId, bookingId } = req.body;

    // ✅ Register model for both PWA and DRA DBs
    createHomeCareModel(req.conn1); // DRA DB
    createHomeCareModel(req.conn2); // PWA DB

    // ✅ Get model instances
    const PwaHomeCareModel = req.conn2.model('Home23');
    const DraHomeCareModel = req.conn1.model('Home23');

    // 1. Find the booking from PWA DB
    const homeRequest = await PwaHomeCareModel.findOne({ 'bookings.bookingId': bookingId });
    if (!homeRequest) return res.status(404).json({ error: 'Booking not found in PWA DB' });

    // 2. Extract the specific booking
    const booking = homeRequest.bookings.find((b) => b.bookingId === bookingId);
    if (!booking) return res.status(404).json({ error: 'Booking not found inside document' });

    // 3. Update booking in PWA DB
booking.draId = draId;
booking.draAcceptedById = draId;
    booking.status = 'pending';

    await homeRequest.save();

 const clonedBooking = {
      ...booking.toObject(),
      userId: homeRequest.userId,
      mobile: homeRequest.mobile
    };

    // 4. Save the accepted booking in DRA DB
    const draHomeRequest = new DraHomeCareModel({
      userId: homeRequest.userId,
      bookings: [booking],
    });

    await draHomeRequest.save();

    res.json({ message: 'HomeCare request accepted and stored in DRA DB.' });
  } catch (error) {
    console.error('Error accepting HomeCare request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};