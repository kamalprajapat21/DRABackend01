import express from 'express';
import {
  createEarning,
  // getAllEarnings
} from '../../controllers/Home/earningHomeController.js';
// } from '../controllers/earningController.js';

const router = express.Router();


router.post('/create', createEarning);



export default router;
