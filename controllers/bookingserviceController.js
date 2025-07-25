//practice
// backend/controllers/bookingserviceController.js
import createUserBookings from '../models/BookingforUrgent.js';

// Get all urgent bookings
export const getUrgentBookings = async (req, res) => {
  try {
    const UserBookings = createUserBookings(req.conn1);
    const bookings = await UserBookings.find();
    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get booking by ID
export const getBookingById = async (req, res) => {
  const UserBookings = createUserBookings(req.conn1);

  try {
    const userBookings = await UserBookings.findOne({ 'bookings._id': req.params.id });

    if (!userBookings) {
      return res.status(404).json({ msg: 'Booking not found' });
    }

    const booking = userBookings.bookings.id(req.params.id);
    res.json(booking);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Booking not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Update booking status from Pending to Completed
export const endService = async (req, res) => {
  const UserBookings = createUserBookings(req.conn1);

  try {
    const { id } = req.params;
    const userBookings = await UserBookings.findOne({ 'bookings._id': id });

    if (!userBookings) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const booking = userBookings.bookings.id(id);
    if (booking.status !== 'pending') {
      return res.status(400).json({ message: 'Booking is not in Pending status' });
    }

    booking.status = 'Completed';

    await userBookings.save();

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
