import express from 'express';
import {
  startService,
  verifyStartOtp,
  endService,
  verifyEndOtp
} from '../controllers/draServiceController.js';

const router = express.Router();

router.post('/start', startService);
router.post('/start/verify', verifyStartOtp);
router.post('/end', endService);
router.post('/end/verify', verifyEndOtp);

export default router;
