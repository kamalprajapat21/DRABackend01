


import createUser from '../models/User.js';
import createUserBookingMd from '../models/BookingforUrgent.js';
// import UserBookingVd from '../models/BookingforUrgent2.js';
import createAlert from '../models/Alert.js';



export const getAlert = async (req, res) => {

  const User = createUser(req.conn1);
  const UserBookingMd = createUserBookingMd(req.conn1);
  const Alert = createAlert(req.conn1);
  const { phoneNumber } = req.body;
  try {
    // Find the user by phone number
    const user = await User.findOne({ mobile: phoneNumber });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find medicine bookings by user ID
    const medicineBookings = await UserBookingMd.findOne({ userId: user._id });

    // Find vaccination bookings by user ID
    // const vaccinationBookings = await UserBookingVd.findOne({ userId: user._id });

    // Initialize an array to store alerts
    let alerts = [];

    // Process medicine bookings if found
    if (medicineBookings) {
      const medicineAlerts = medicineBookings.bookings
        .filter(booking => booking.status === 'Incoming')
        .map(booking => ({
          patientName: booking.patientName,
          date: booking.date,
          time: booking.time,
          status: booking.status,
          type: 'Medicine', // Add a type field to distinguish medicine notifications
          userId: user._id,
          visible: true
        }));

      // Check if alerts already exist to avoid duplicates
      for (const alert of medicineAlerts) {
        const existingAlert = await Alert.findOne({
          patientName: alert.patientName,
          date: alert.date,
          time: alert.time,
          type: 'Medicine',
          userId: user._id
        });

        if (!existingAlert) {
          // Save new medicine alerts to Alert model
          const newAlert = await Alert.create(alert);
          alerts.push(newAlert);
        } else if (!existingAlert.visible) {
          // Skip alerts that were previously marked as not visible
          continue;
        } else {
          alerts.push(existingAlert);
        }
      }
    }
    res.status(200).json(alerts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const clearAllAlerts = async (req, res) => {
  const User = createUser(req.conn1);
  const UserBookingMd = createUserBookingMd(req.conn1);
  const Alert = createAlert(req.conn1);
  const { phoneNumber } = req.body;

  try {
    const user = await User.findOne({ mobile: phoneNumber });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await Alert.updateMany({ userId: user._id }, { visible: false });

    res.status(200).json({ message: 'All alerts cleared' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};