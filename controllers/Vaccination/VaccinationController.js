
///Updated Code
// controllers/homeCareController.js
import createHomeCareModel from '../../models/BOOKING/VaccinationModel.js';

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

    // Register and get model
    createHomeCareModel(req.conn1); // DRA DB
    createHomeCareModel(req.conn2); // PWA DB

    const PwaVaccinationModel = req.conn2.model('vaccination10');
    const DraVaccinationModel = req.conn1.model('vaccination10');

    // Find in PWA
    const vaccDoc = await PwaVaccinationModel.findOne({ 'bookings.bookingId': bookingId });
    if (!vaccDoc) return res.status(404).json({ error: 'Booking not found in PWA DB' });

    const booking = vaccDoc.bookings.find(b => b.bookingId === bookingId);
    if (!booking) return res.status(404).json({ error: 'Booking not found inside document' });

    // ✅ Update status and DRA info
    booking.draId = draId;
    booking.draAcceptedById = draId; // optional, depends on your schema
    booking.status = 'pending';

    await vaccDoc.save();

    // Clone and store in DRA DB
    const clonedBooking = {
      ...booking.toObject(),
      userId: vaccDoc.userId,
      mobile: booking.mobile || vaccDoc.mobile,
    };

    const draVaccRecord = new DraVaccinationModel({
      userId: vaccDoc.userId,
      bookings: [clonedBooking],
    });

    await draVaccRecord.save();

    res.json({ message: 'Vaccination booking accepted and saved in DRA DB' });
  } catch (error) {
    console.error('Error accepting Vaccination booking:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
