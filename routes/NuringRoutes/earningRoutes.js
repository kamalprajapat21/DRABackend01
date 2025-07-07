import express from 'express';
import {
  createEarning,
  // getAllEarnings
} from '../../controllers/Home/earningHomeController.js';
// } from '../controllers/earningController.js';

const router = express.Router();

// @route   POST /api/earnings
// @desc    Create a new earning entry
router.post('/create', createEarning);

// @route   GET /api/earnings
// @desc    Get all earning entries
// router.get('/', getAllEarnings);

export default router;
