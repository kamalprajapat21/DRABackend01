// // routes/notifications.js

// import express from 'express';
// import Notification from '../models/BOOKING/Notification.js';

// const router = express.Router();

// router.post('/', async (req, res) => {
//   try {
//     const { title, message, serviceType, bookingId } = req.body;

//     const notification = new Notification({
//       title,
//       message,
//       serviceType,
//       bookingId
//     });

//     await notification.save();
//     res.status(201).json({ message: 'Notification created for all DRAs' });
//   } catch (error) {
//     res.status(500).json({ error: 'Error creating notification' });
//   }
// });

// export default router;



import express from 'express';
import { createNotification, getNotifications } from '../../controllers/notificationController.js';

const router = express.Router();

router.post('/', (req, res, next) => {
  console.log('✅ POST /api/notifications received');
  next();
}, createNotification);
router.get('/dra', getNotifications);

export default router;