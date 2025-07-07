import express from 'express';
import { updateWithdrawStatus } from '../controllers/withdrawController.js';

const router = express.Router();

router.post('/update-status', updateWithdrawStatus);

export default router;
