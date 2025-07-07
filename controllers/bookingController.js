//practice
import createUser from '../models/User.js';
import createUserBookings from '../models/BookingforUrgent.js';
import createEarning from '../models/Earning.js';

export const createBookingUrgent = async (req, res) => {
  try {
    const User = createUser(req.conn1);
    const UserBookings = createUserBookings(req.conn1);
    const Earning = createEarning(req.conn1);

    const { userId, bookingId, date, time, labTests, patientName, address, charges, status } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      console.log('Alert: User not found');
      return res.status(404).json({ error: 'User not found' });
    }

    const newBooking = {
      bookingId,
      date,
      time,
      labTests,
      patientName,
      address,
      charges,
      status
    };

    const userBookings = await UserBookings.findOne({ userId });

    if (userBookings) {
      userBookings.bookings.push(newBooking);
      await userBookings.save();
    } else {
      await UserBookings.create({
        userId,
        bookings: [newBooking]
      });
    }

    if (status === 'Completed') {
      let earning = await Earning.findOne({ userId: userId });
      if (!earning) {
        earning = new Earning({ userId: userId });
      }

      earning.availableBalance += charges;
      await earning.save();
    }

    res.status(201).json({
      message: 'Urgent booking created successfully',
      booking: newBooking,
    });
  } catch (error) {
    console.log('Alert: Server error', error.message);
    res.status(500).json({ error: 'Failed to create urgent booking' });
  }
};

export const createBookingStandalone = async (req, res) => {
  try {
    const User = createUser(req.conn1);
    const UserBookings = createUserBookings(req.conn1);
    const Earning = createEarning(req.conn1);
    const { userId, bookingId, date, time, labTests, patientName, address, charges, status } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      console.log('Alert: User not found');
      return res.status(404).json({ error: 'User not found' });
    }

    const newBooking = {
      bookingId,
      date,
      time,
      labTests,
      patientName,
      address,
      charges,
      status
    };

    const userBookings = await UserBookings.findOne({ userId });

    if (userBookings) {
      userBookings.bookings.push(newBooking);
      await userBookings.save();
    } else {
      await UserBookings.create({
        userId,
        bookings: [newBooking]
      });
    }

    if (status === 'Completed') {
      let earning = await Earning.findOne({ userId: userId });
      if (!earning) {
        earning = new Earning({ userId: userId });
      }

      earning.availableBalance += charges;
      await earning.save();
    }

    res.status(201).json({
      message: 'Standalone booking created successfully',
      booking: newBooking,
    });
  } catch (error) {
    console.log('Alert: Server error', error.message);
    res.status(500).json({ error: 'Failed to create standalone booking' });
  }
};

export const getAllIncoming = async (req, res) => {
  const User = createUser(req.conn1);
  const UserBookings = createUserBookings(req.conn1);
  const Earning = createEarning(req.conn1);
  const { phoneNumber } = req.body;
  console.log(phoneNumber);
  try {
    const user = await User.findOne({ mobile: phoneNumber });
    if (!user) {
      return res.status(404).send('User not found');
    }
    const userBookings = await UserBookings.findOne({ userId: user._id }).populate('userId');

    if (!userBookings) {
      return res.status(404).send('No bookings found for this user');
    }
    const incomingBookings = userBookings.bookings.filter(booking => booking.status === 'Incoming');

    res.json(incomingBookings);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const acceptBooking = async (req, res) => {
  try {
    const User = createUser(req.conn1);
    const UserBookings = createUserBookings(req.conn1);
    const Earning = createEarning(req.conn1);
    const { id } = req.params;
    console.log(id);
    const userBookings = await UserBookings.findOne({ 'bookings._id': id });

    console.log(userBookings.bookings._id);
    if (!userBookings) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const booking = userBookings.bookings.id(id);
    booking.status = 'Pending';

    await userBookings.save();

    res.json(booking);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const rejectBooking = async (req, res) => {
  try {
    const User = createUser(req.conn1);
    const UserBookings = createUserBookings(req.conn1);
    const Earning = createEarning(req.conn1);
    const { id } = req.params;
    const userBookings = await UserBookings.findOne({ 'bookings._id': id });

    if (!userBookings) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const booking = userBookings.bookings.id(id);
    booking.status = 'Reject';

    await userBookings.save();

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getAllPending = async (req, res) => {
  const User = createUser(req.conn1);
  const UserBookings = createUserBookings(req.conn1);
  const Earning = createEarning(req.conn1);
  const { phoneNumber } = req.body;
  console.log(phoneNumber);
  try {
    const user = await User.findOne({ mobile: phoneNumber });
    if (!user) {
      return res.status(404).send('User not found');
    }

    const userBookings = await UserBookings.findOne({ userId: user._id }).populate('userId');

    if (!userBookings) {
      return res.status(404).send('No bookings found for this user');
    }

    const urgentBookings = userBookings.bookings.filter(booking => booking.status === 'Pending');

    res.json(urgentBookings);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getAllCompleted = async (req, res) => {
  const User = createUser(req.conn1);
  const UserBookings = createUserBookings(req.conn1);
  const Earning = createEarning(req.conn1);
  const { phoneNumber } = req.body;
  console.log(phoneNumber);
  try {
    const user = await User.findOne({ mobile: phoneNumber });
    if (!user) {
      return res.status(404).send('User not found');
    }

    const userBookings = await UserBookings.findOne({ userId: user._id }).populate('userId');

    if (!userBookings) {
      return res.status(404).send('No bookings found for this user');
    }

    const urgentBookings = userBookings.bookings.filter(booking => booking.status === 'Completed');

    res.json(urgentBookings);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const completeBooking = async (req, res) => {
  const User = createUser(req.conn1);
  const UserBookings = createUserBookings(req.conn1);
  const Earning = createEarning(req.conn1);
  try {

    const { id } = req.params;
    const userBookings = await UserBookings.findOne({ 'bookings._id': id });

    if (!userBookings) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const booking = userBookings.bookings.id(id);
    booking.status = 'Completed';

    await userBookings.save();

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
