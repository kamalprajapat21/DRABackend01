import express from 'express';
import { getAllPharmacies,getPharmacyById,getPharmacyLabNameById } from '../../controllers/Pharmacy/vaccinationController.js'; // Adjust the import path as necessary
// import { getAllPharmacies } from '../controllers/vaccinationController.js';

const router = express.Router();

router.get('/pharmacies', getAllPharmacies); 
router.get('/pharmacies/:id', getPharmacyById);   // Specific pharmacy by ID
router.get('/pharmacieslabname/:id', getPharmacyLabNameById);   // Specific pharmacy by ID
// router.get('/pharmacies/:number', getPharmacyByMobile);   // Specific pharmacy by mobile number


export default router;
