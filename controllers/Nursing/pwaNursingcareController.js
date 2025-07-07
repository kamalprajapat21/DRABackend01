// controllers/pwaHomecareController.js
// import createPwaHomeModel from '../../models/';
// import createPwaHomeModel from '../../models/BOOKING/Home.js';

//  export const getPatientDetailsByBookingId = async (req, res) => {
//   try {
//     const { bookingId } = req.params;
//     console.log(bookingId);
//     const conn2 = req.conn2; // ensure conn2 is attached via middleware

//     const PwaHomeModel = createPwaHomeModel(conn2);

//     // Find document that contains the matching bookingId
//     const document = await PwaHomeModel.findOne({ 'bookings.bookingId': bookingId });


//     console.log(document);
//     if (!document) {
//       return res.status(404).json({ message: 'Booking not found' });
//     }

//     // Extract the actual booking from bookings array
//     const booking = document.bookings.find(b => b.bookingId === bookingId);

//     if (!booking) {
//       return res.status(404).json({ message: 'Booking ID not found inside document' });
//     }

//     // Send back the booking (patient) details
//     res.status(200).json({ patient: booking });
//   } catch (error) {
//     console.error('Error fetching patient details:', error);
//     res.status(500).json({ message: 'Internal server error', error: error.message });
//   }
// };

// controllers/pwaHomecareController.js
import createPwaNursingModel from '../../models/BOOKING/NursingModel.js';
import createHomeCareModel from '../../models/BOOKING/NursingModel.js';

export const getPatientDetailsByBookingId = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const conn2 = req.conn2; // ✅ Make sure conn2 is passed via middleware

    const PwaNursingModel = createPwaNursingModel(conn2); // returns model bound to conn2

    // Find document that contains the booking
    const document = await PwaNursingModel.findOne({ 'bookings.bookingId': bookingId });

    if (!document) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Find the actual booking inside the bookings array
    const booking = document.bookings.find(b => b.bookingId === bookingId);

    if (!booking) {
      return res.status(404).json({ message: 'Booking ID not found inside document' });
    }

    res.status(200).json({ patient: booking });
  } catch (error) {
    console.error('Error fetching patient details:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};




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

    // ✅ Register models
    createPwaNursingModel(req.conn2); // PWA
    createPwaNursingModel(req.conn1); // DRA

    const PwaHomeCareModel = req.conn2.model('Nursing23');
    const DraHomeCareModel = req.conn1.model('Nursing23');

    // 1. Find document in PWA DB
    const homeRequest = await PwaHomeCareModel.findOne({ 'bookings.bookingId': bookingId });
    if (!homeRequest) return res.status(404).json({ error: 'Booking not found in PWA DB' });

    // 2. Extract the specific booking
    const booking = homeRequest.bookings.find(b => b.bookingId === bookingId);
    if (!booking) return res.status(404).json({ error: 'Booking not found in bookings array' });

    // 3. Update fields
    booking.draId = draId;
    booking.draAcceptedById = draId;
    booking.status = 'pending';

    // 4. Save changes in PWA DB
    await homeRequest.save();

    // 5. Save to DRA DB
    const draHomeRequest = new DraHomeCareModel({
      userId: homeRequest.userId,
      bookings: [booking],
    });

    await draHomeRequest.save();

    res.json({ message: 'NursingCare request accepted and stored in DRA DB.' });
  } catch (error) {
    console.error('Error accepting NursingCare request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




export default getPatientDetailsByBookingId;


