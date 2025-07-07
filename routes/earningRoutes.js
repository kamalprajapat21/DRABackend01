// backend/routes/earningRoutes.js
import express from 'express';
// import { getEarnings} from '../controllers/earningController.js';
// import { getAvailable } from '../controllers/AvailableController.js';
// import { getHistory } from '../controllers/historyController.js';
// // import { getThistory } from '../controllers/historyController.js';
import { createEarning, getEarningByLabId } from "../controllers/earningControllerperService.js";


const router = express.Router();

// router.post('/total', getEarnings);
// router.post('/available', getAvailable);
// router.post('/history',getHistory); // New route
// // router.post('/thistory',getThistory); // New route


// import { createEarning, getAllEarnings } from "../controllers/earningController.js";
import {
  addEarning,
  getEarnings,
  withdrawAmount,
  getEarningHistory,
  getWithdrawalHistory,
  getCompletedBookingsByDraId,
  getCurrentMonthIncome
} from '../controllers/earningController.js';

// const router = express.Router();

router.post('/add', addEarning);
router.get('/:draId', getEarnings);
router.post('/withdraw', withdrawAmount);
router.get('/history/:draId', getEarningHistory);
router.get('/withdrawal-history/:draId', getWithdrawalHistory);
router.get('/:draId/completed-bookings', getCompletedBookingsByDraId);
router.get('/earning/monthly-income/current', getCurrentMonthIncome); /// "http://localhost:5000/api/earning/monthly-income/current?draId=VACC001"



// export default router;


// POST - create earning
router.post('/earnings', createEarning);

// GET - fetch earning by labId
router.get('/earnings/:labId', getEarningByLabId);

export default router;

