import express from 'express';
// import { getAllPatients } from '../../controllers/Pharmacy/patientController.js';
import { getAllPatients, getPatientById } from '../../controllers/Pharmacy/patientController.js';

// import { getAllPatients } from '../controllers/patientController.js';

const router = express.Router();

router.get('/patients', getAllPatients);
router.get('/patients/:id', getPatientById);    // Get a particular patient by ID

export default router;
