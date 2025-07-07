// controllers/earningController.js
import {createEarningModel } from '../models/EarningperService.js';
import mongoose from 'mongoose';
// export const createEarning = async (req, res) => {
//   try {
//     const Earning = createEarningModel(req.conn1); // This should be BookingsDB
//     const { labId, serviceAmount } = req.body;

//     const tds = Math.round(serviceAmount * 0.12);
//     const convenienceFee = Math.round(serviceAmount * 0.08);
//     const total = serviceAmount - tds - convenienceFee;

//     const newEarning = new Earning({
//       labId,
//       serviceAmount,
//       tds,
//       convenienceFee,
//       total,
//     });

//     await newEarning.save();

//     res.status(201).json(newEarning);
//   } catch (error) {
//     console.error("Error creating earning:", error);
//     res.status(500).json({ message: "Failed to create dummy earning", error });
//   }
// };



// //WorkingCode
// export const createEarning = async (req, res) => {
//   try {
//     const { labId, serviceAmount } = req.body;

//     if (!labId || !serviceAmount) {
//       return res.status(400).json({ message: 'labId and serviceAmount are required' });
//     }

//     const tds = serviceAmount * 0.1;
//     const convenienceFee = serviceAmount * 0.05;
//     const total = serviceAmount + tds + convenienceFee;

//     const Earning = createEarningModel(req.conn1);

//     const newEarning = new Earning({ labId, serviceAmount, tds, convenienceFee, total });
//     await newEarning.save();

//     res.status(201).json({ success: true, data: newEarning });
//   } catch (error) {
//     console.error('Error creating earning:', error);
//     res.status(500).json({ success: false, message: 'Failed to create earning', error: error.message });
//   }
// };


// import createEarningModel from '../models/Earning.js';
import createVaccinationModel from '../models/BOOKING/VaccinationModel.js'; // Vaccination10 collection

export const createEarning = async (req, res) => {
  try {
    const { labId, serviceAmount } = req.body;

    if (!labId || !serviceAmount) {
      return res.status(400).json({ message: 'labId and serviceAmount are required' });
    }

    const Earning = createEarningModel(req.conn1);
    const Vaccination = createVaccinationModel(req.conn2); // conn2 = PWA DB

    // ✅ Check if labId exists in Vaccination10 collection
    const exists = await Vaccination.findOne({ 'bookings.labId': labId });

    if (!exists) {
      return res.status(404).json({ message: 'labId not found in Vaccination10' });
    }

    // Calculate earnings
    const tds = serviceAmount * 0.1;
    const convenienceFee = serviceAmount * 0.05;
    const total = serviceAmount - tds - convenienceFee;

    // Save to Earning model
    const newEarning = new Earning({ labId, serviceAmount, tds, convenienceFee, total });
    await newEarning.save();

    res.status(201).json({ success: true, data: newEarning });
  } catch (error) {
    console.error('Error creating earning:', error);
    res.status(500).json({ success: false, message: 'Failed to create earning', error: error.message });
  }
};




// import { createEarningModel } from '../models/Earning.js';

export const getEarningByLabId = async (req, res) => {
  try {
    const { labId } = req.params;

    if (!labId) {
      return res.status(400).json({ success: false, message: 'labId is required' });
    }

    const Earning = createEarningModel(req.conn2); // Use correct DB connection
    const earning = await Earning.findOne({ labId });

    if (!earning) {
      return res.status(404).json({ success: false, message: 'Earning not found for this labId' });
    }

    res.status(200).json({ success: true, data: earning });
  } catch (error) {
    console.error('Error fetching earning:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch earning', error: error.message });
  }
};
