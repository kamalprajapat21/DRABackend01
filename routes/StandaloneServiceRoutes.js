// // routes/vaccinationServiceRoutes.js
// const express = require('express');
// const router = express.Router();
// const vaccinationServiceController = require('../controllers/vaccinationServiceController');

// router.post('/services', vaccinationServiceController.createVaccinationService);
// router.get('/services', vaccinationServiceController.getVaccinationServices);
// router.post('/request-quotation', vaccinationServiceController.requestQuotation);

// module.exports = router;

// backend/routes/StandaloneServiceRoutes.js

import express from 'express';
import { getLab} from '../controllers/BOOKING/labController.js';
// import { getPrescriptionById } from '../controllers/BOOKING/prescriptionController.js';
import { acceptLab, completeLab, rejectLab } from '../controllers/BOOKING/labController2.js';
import { getCancelled, getPending, getCompleted } from '../controllers/BOOKING/incomingpendingcompletedController.js';
import { getPendingbyID } from '../controllers/BOOKING/getpendingbyidController.js';
//just for testing
import { getPrescriptionById } from '../controllers/BOOKING/prescriptionController.js';

//just for testing

const router = express.Router();

router.get('/lab', getLab);
router.post('/pending', getPending )
// router.get('/pending/:id', getPendingbyID )
router.get('/pending/:labId', getPendingbyID )
router.post('/cancelled', getCancelled )
router.post('/completed', getCompleted )
router.post('/accept', acceptLab);
router.post('/reject', rejectLab);
router.post('/complete/:labId', completeLab);
router.get('/:id', getPrescriptionById);
export default router;

