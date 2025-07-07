// routes/pwaHomecareRoutes.js
import express from 'express';
// import { getPatientDetailsByBookingId } from '../controllers/Home/pwaHomecareController.js';
// import { getPatientDetailsByBookingId } from '../../controllers/Nursing/pwaNursingcareController.js';
import connectDB from '../../config/db.js';
import {
  getAvailableHomeCare,
  rejectHomeCare,
  acceptHomeCare,
  getPatientDetailsByBookingId
} from '../../controllers/Nursing/pwaNursingcareController.js';


const router = express.Router();




router.get('/patient/:bookingId', async (req, res, next) => {
  try {
    const { conn2 } = await connectDB();  // ✅ connect to PWA DB
    req.conn2 = conn2;                    // ✅ attach it to request
    next();                               // ✅ pass to controller
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).json({ message: 'Database connection error', error: error.message });
  }
}, getPatientDetailsByBookingId);






// GET available HomeCare services (not rejected by DRA)
router.get('/available/:draId', getAvailableHomeCare);

// POST reject a HomeCare service
router.post('/reject', rejectHomeCare);

// POST accept a HomeCare service
router.post('/accept', acceptHomeCare);

export default router;



