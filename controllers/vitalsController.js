// import createVitalModel from '../models/Vitals.js';

// export const uploadVitals = async (req, res) => {
//   try {
//     const Vital = createVitalModel(req.conn2);
//     const {
//       patientName, bloodPressure, pulseOximeter, temperature, weight,
//       height, bmi, ecg, bloodGlucose, haemoglobin, cholesterol, uricAcid,
//       typhoid, malaria, hepatitisB, syphilis, hepatitisC, hiv,
//       dengueAntigen, cardiacTroponin, urine2P, notes,
//     } = req.body;

//     const reports = req.files?.map(file => file.path) || [];

//     const vitals = new Vital({
//       patientName,
//       bloodPressure,
//       pulseOximeter,
//       temperature,
//       weight,
//       height,
//       bmi,
//       ecg,
//       bloodGlucose,
//       haemoglobin,
//       cholesterol,
//       uricAcid,
//       notes,
//       reports,
//       optionalTests: {
//         typhoid,
//         malaria,
//         hepatitisB,
//         syphilis,
//         hepatitisC,
//         hiv,
//         dengueAntigen,
//         cardiacTroponin,
//         urine2P
//       }
//     });

//     await vitals.save();
//     res.status(201).json({ message: 'Vitals uploaded successfully', vitals });
//   } catch (error) {
//     console.error('Error uploading vitals:', error);
//     res.status(500).json({ message: 'Failed to upload vitals', error: error.message });
//   }
// };



// import Vitals from '../models/Vitals.js';

// export const addVitals = async (req, res) => {
//   try {
//     const vitals = new Vitals(req.body);
//     await vitals.save();
//     res.status(201).json({ message: 'Vitals saved successfully' });
//   } catch (err) {
//     console.error('Error saving vitals:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };




// // backend/controllers/vitalsController.js
// import createVitalsModel from '../models/vitalsModel.js';

// export const addVitals = async (req, res) => {
//   try {
//     const Vitals = createVitalsModel(req.conn2); // Use correct connection
//     const { patientId, bloodPressure, heartRate, temperature } = req.body;

//     const newVitals = await Vitals.create({ patientId, bloodPressure, heartRate, temperature });
//     res.status(201).json({ success: true, data: newVitals });
//   } catch (error) {
//     console.error('Error adding vitals:', error);
//     res.status(500).json({ success: false, message: 'Failed to add vitals' });
//   }
// };



////06-06-2025 code
// backend/controllers/vitalsController.js
import dbConnect from '../config/db.js'; // ✅ Add this line
// import createVitalsModel from '../models/vitalsModel.js';

// export const addVitals = async (req, res) => {
//   try {
//     const { conn1 } = await dbConnect(); // ✅ connect to DB
//     const Vitals = createVitalsModel(conn1); // ✅ use conn2

//     const { bookingId, bloodPressure, heartRate, temperature } = req.body;

//     const newVitals = await Vitals.create({
//       bookingId,
//       bloodPressure,
//       heartRate,
//       temperature
//     });

//     res.status(201).json({ success: true, data: newVitals });
//   } catch (error) {
//     console.error('Error adding vitals:', error);
//     res.status(500).json({ success: false, message: 'Failed to add vitals' });
//   }
// };



// // update sheemacode

// // controllers/vitalsController.js
// import createVitalsModel from '../models/VitalsModel.js';

// export const addVitals = async (req, res) => {
//   try {
//     const Vitals = createVitalsModel(req.conn2); // Use second DB connection

//     const {
//       bookingId,
//       patientName,
//       bloodPressure,
//       pulseOximeter,
//       temperature,
//       weight,
//       height,
//       bmi,
//       ecg,
//       bloodGlucose,
//       haemoglobin,
//       cholesterol,
//       optionalTests,
//       notes
//     } = req.body;

//     const testReportFile = req.file?.filename || ''; // from multer (if file uploaded)

//     const newVitals = await Vitals.create({
//       bookingId,
//       patientName,
//       bloodPressure,
//       pulseOximeter,
//       temperature,
//       weight,
//       height,
//       bmi,
//       ecg,
//       bloodGlucose,
//       haemoglobin,
//       cholesterol,
//       optionalTests,
//       testReportFile,
//       notes,
//     });

//     res.status(201).json({ success: true, data: newVitals });
//   } catch (error) {
//     console.error('Error adding vitals:', error);
//     res.status(500).json({ success: false, message: 'Failed to add vitals' });
//   }
// };




import createVitalsModel from '../models/vitalsModel.js';


export const addVitals = async (req, res) => {
  try {
    const Vitals = createVitalsModel(req.conn1);

    // Destructure all fields
    let {
      bookingId,
      patientName,
      bloodPressure,
      pulseOximeter,
      temperature,
      weight,
      height,
      bmi,
      ecg,
      bloodGlucose,
      haemoglobin,
      cholesterol,
      notes
    } = req.body;

    // Parse optionalTests from JSON string if present
    let optionalTests = [];
    if (req.body.optionalTests) {
      try {
        optionalTests = JSON.parse(req.body.optionalTests);
      } catch (parseError) {
        return res.status(400).json({
          success: false,
          message: 'Invalid JSON format for optionalTests',
        });
      }
    }

    // Handle uploaded files
    const testReports = req.files?.map((file) => ({
      filename: file.filename,
      path: file.path,
    })) || [];

    const newVitals = await Vitals.create({
      bookingId,
      patientName,
      bloodPressure,
      pulseOximeter,
      temperature,
      weight,
      height,
      bmi,
      ecg,
      bloodGlucose,
      haemoglobin,
      cholesterol,
      optionalTests,
      testReports,
      notes
    });

    res.status(201).json({ success: true, data: newVitals });
  } catch (error) {
    console.error('Error adding vitals:', error);
    res.status(500).json({ success: false, message: 'Failed to add vitals' });
  }
};
