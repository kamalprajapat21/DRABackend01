import express from 'express';
import {
  getAvailableUrgentCases,
  rejectUrgentCase,
  acceptUrgentCase,
} from '../controllers/BOOKING/urgentCaseController.js';

const router = express.Router();

// Middleware to inject DB connections into each request
router.use(async (req, res, next) => {
  try {
   const dbModule = await import('../config/db.js');
const { conn1, conn2 } = await dbModule.default();

    req.conn1 = conn1;
    req.conn2 = conn2;
    next();
  } catch (error) {
    next(error);
  }
});

// Routes
router.get('/available/:draId', getAvailableUrgentCases);
router.post('/reject', rejectUrgentCase);
router.post('/accept', acceptUrgentCase);

// ✅ Export router
export default router;
