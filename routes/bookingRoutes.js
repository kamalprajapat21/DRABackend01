import express from 'express';
import {
  createBookingUrgent,
  getAllIncoming,
  getAllPending,
  getAllCompleted
  
} from '../controllers/bookingController.js';
import { acceptBooking,rejectBooking } from '../controllers/bookingController.js';

const router = express.Router();

// // Route for BookingforUrgent
// router.post('/create', createBookingUrgent);
// router.post('/incoming', getAllIncoming);
// router.post('/pending', getAllPending);
// router.post('/completed', getAllCompleted);

// Route for Accept Reject
router.post('/:id/accept', acceptBooking);
router.post('/:id/reject', rejectBooking);

export default router;
