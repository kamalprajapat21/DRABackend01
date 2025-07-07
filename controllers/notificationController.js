import notificationModel from '../models/BOOKING/Notification.js'; // adjust path if needed
import { io } from '../config/socket.js'; // socket.io server
// ⚠️ No direct conn2 import here — we use req.conn2

// ==============================
// Create Notification (PWA ➝ DRA or DRA ➝ PWA)
// ==============================

// export const createNotification = async (req, res) => {
//   try {
//     const {
//       message,
//       for: target,       // 'DRA' or 'PWA'
//       userId,            // Only for PWA target
//       serviceType,
//       bookingId,
//       draName,
//       draId,
//       patientName,
//       patientId
//     } = req.body;

//     // ✅ Build the Notification model from the request's DB connection (PWA DB)
//     const Notification = notificationModel(req.conn2);

//     const notification = new Notification({
//       message,
//       for: target,
//       userId,
//       serviceType,
//       bookingId,
//       draName,
//       draId,
//       patientName,
//       patientId
//     });

//     await notification.save();

//     // ✅ Real-time event
//     if (target === 'DRA') {
//       io.emit('newBooking', {
//         message,
//         serviceType,
//         bookingId,
//         patientName,
//         patientId
//       });
//     } else if (target === 'PWA' && userId) {
//       io.to(userId.toString()).emit('bookingAccepted', {
//         message,
//         bookingId,
//         draName,
//         draId
//       });
//     }

//     res.status(201).json({ success: true, notification });

//   } catch (error) {
//     console.error('❌ Error creating notification:', error);
//     res.status(500).json({ success: false, message: 'Internal Server Error' });
//   }
// };

export const createNotification = async (req, res) => {
  try {
    const {
      message,
      for: target,       // 'DRA' or 'PWA'
      userId,            // Only for 'PWA' target
      serviceType,
      bookingId,
      draName,
      draId,
      patientName
    } = req.body;

    const Notification = notificationModel(req.conn2);
    let patientMobile = null;

    // ✅ Only when sending from PWA ➝ DRA
    if (target === 'DRA' && bookingId) {
      let bookingDoc = null;

      // 👉 Use correct model based on serviceType
      if (serviceType === 'HomeCare') {
        const HomeModel = req.conn2.model('Home23');
        bookingDoc = await HomeModel.findOne({ 'bookings.bookingId': bookingId }, { 'bookings.$': 1 });
        patientMobile = bookingDoc?.bookings?.[0]?.mobileNumber;
      } else if (serviceType === 'Vaccination') {
        const VaccinationModel = req.conn2.model('vaccination10');
        bookingDoc = await VaccinationModel.findOne({ 'bookings.bookingId': bookingId }, { 'bookings.$': 1 });
        patientMobile = bookingDoc?.bookings?.[0]?.mobileNumber;
      } else if (serviceType === 'UrgentCare') {
        const UrgentModel = req.conn2.model('UrgentCase');
        bookingDoc = await UrgentModel.findOne({ 'bookings.bookingId': bookingId }, { 'bookings.$': 1 });
        patientMobile = bookingDoc?.bookings?.[0]?.mobileNumber;
      } else if (serviceType === 'Nursing') {
        const NursingModel = req.conn2.model('Nursing23');
        bookingDoc = await NursingModel.findOne({ 'bookings.bookingId': bookingId }, { 'bookings.$': 1 });
        patientMobile = bookingDoc?.bookings?.[0]?.mobileNumber;
      }
    }

    // ✅ Create notification with mobile
    const notification = new Notification({
      message,
      for: target,
      userId,
      serviceType,
      bookingId,
      draName,
      draId,
      patientName,
      patientMobile // ✅ attach here
    });

    await notification.save();

    // ✅ Emit
    if (target === 'DRA') {
      io.emit('newBooking', {
        message,
        serviceType,
        bookingId,
        patientName,
        patientMobile
      });
    } else if (target === 'PWA' && userId) {
      io.to(userId.toString()).emit('bookingAccepted', {
        message,
        bookingId,
        draName,
        draId
      });
    }

    res.status(201).json({ success: true, notification });

  } catch (error) {
    console.error('❌ Error creating notification:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};




// ==============================
// Get Notifications (for DRA or PWA)
// ==============================

export const getNotifications = async (req, res) => {
  try {
    const { userId, role } = req.query;

    const Notification = notificationModel(req.conn2);

    const filter = role === 'DRA'
      ? { for: 'DRA' }
      : { for: 'PWA', userId };

    const notifications = await Notification.find(filter).sort({ createdAt: -1 });

    res.status(200).json({ success: true, notifications });
  } catch (error) {
    console.error('❌ Error fetching notifications:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch notifications' });
  }
};
