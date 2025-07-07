import express from 'express';
import {
  getAvailableHomeCare,
  rejectHomeCare,
  acceptHomeCare
} from '../../controllers/Vaccination/VaccinationController.js';

const router = express.Router();

// GET available HomeCare services (not rejected by DRA)
router.get('/available/:draId', getAvailableHomeCare);

// POST reject a HomeCare service
router.post('/reject', rejectHomeCare);

// POST accept a HomeCare service
router.post('/accept', acceptHomeCare);

export default router;
