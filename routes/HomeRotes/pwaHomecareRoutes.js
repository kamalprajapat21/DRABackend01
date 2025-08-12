import express from 'express';
import {
  getAvailableHomeCare,
  rejectHomeCare,
  acceptHomeCare,getAllIncomingHomeCareBookings
} from '../../controllers/Home/pwaHomecareController.js';

const router = express.Router();

// GET available HomeCare services (not rejected by DRA)
router.get('/available/:draId', getAvailableHomeCare);

// POST reject a HomeCare service
router.post('/reject', rejectHomeCare);

// POST accept a HomeCare service
router.post('/accept', acceptHomeCare);
router.get('/incoming-bookings', getAllIncomingHomeCareBookings);

export default router;
