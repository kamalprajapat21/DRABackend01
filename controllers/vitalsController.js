// // // 






// // import createVitalsModel from '../models/vitalsModel.js';

// // export const addVitals = async (req, res) => {
// //   try {
// //     const Vitals = createVitalsModel(req.conn1);

// //     // Extract normal fields
// //     let {
// //       bookingId,
// //       patientName,
// //       bloodPressure,
// //       pulseOximeter,
// //       temperature,
// //       weight,
// //       height,
// //       bmi,
// //       ecg,
// //       bloodGlucose,
// //       haemoglobin,
// //       cholesterol,
// //       uricAcid,
// //       notes
// //     } = req.body;

// //     // Parse optionalTests if provided
// //     let optionalTests = [];
// //     if (req.body.optionalTests) {
// //       try {
// //         optionalTests = JSON.parse(req.body.optionalTests);
// //       } catch {
// //         return res.status(400).json({ success: false, message: 'Invalid JSON format for optionalTests' });
// //       }
// //     }

// //     // Handle uploaded files (works for single or multiple)
// //     const testReports = (req.files || []).map(file => ({
// //       filename: file.filename,
// //       url: `${req.protocol}://${req.get('host')}/uploads/reports/${file.filename}`
// //     }));

// //     // Save to DB
// //     const newVitals = await Vitals.create({
// //       bookingId,
// //       patientName,
// //       bloodPressure,
// //       pulseOximeter,
// //       temperature,
// //       weight,
// //       height,
// //       bmi,
// //       ecg,
// //       bloodGlucose,
// //       haemoglobin,
// //       cholesterol,
// //       uricAcid,
// //       optionalTests,
// //       testReports,
// //       notes
// //     });

// //     res.status(201).json({ success: true, data: newVitals });

// //   } catch (error) {
// //     console.error('Error adding vitals:', error);
// //     res.status(500).json({ success: false, message: 'Failed to add vitals' });
// //   }
// // };






// import createVitalsModel from '../models/vitalsModel.js';

// export const addVitals = async (req, res) => {
//   try {
//     const Vitals = createVitalsModel(req.conn1);

//     // Extract normal fields
//     let {
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
//       uricAcid,
//       notes
//     } = req.body;

//     // Parse optionalTests if provided
//     let optionalTests = [];
//     if (req.body.optionalTests) {
//       try {
//         optionalTests = JSON.parse(req.body.optionalTests);
//       } catch {
//         return res.status(400).json({
//           success: false,
//           message: 'Invalid JSON format for optionalTests',
//         });
//       }
//     }

//     // Handle uploaded files (public URL instead of server path)
//     // const testReports = (req.files || []).map(file => ({
//     //   filename: file.filename,
//     //   url: `${req.protocol}://${req.get('host')}/uploads/reports/${file.filename}`
//     // }));

//     // // Save to DB
//     // const newVitals = await Vitals.create({
//     //   bookingId,
//     //   patientName,
//     //   bloodPressure,
//     //   pulseOximeter,
//     //   temperature,
//     //   weight,
//     //   height,
//     //   bmi,
//     //   ecg,
//     //   bloodGlucose,
//     //   haemoglobin,
//     //   cholesterol,
//     //   uricAcid,
//     //   optionalTests,
//     //   testReports,
//     //   notes
//     // });



//     // Handle uploaded files (public URL instead of server path)
// const testReports = (req.files || []).map(file => ({
//   filename: file.filename,
//   url: `${req.protocol}://${req.get('host')}/uploads/reports/${file.filename}`
// }));

// const newVitals = await Vitals.create({
//   bookingId,
//   patientName,
//   bloodPressure,
//   pulseOximeter,
//   temperature,
//   weight,
//   height,
//   bmi,
//   ecg,
//   bloodGlucose,
//   haemoglobin,
//   cholesterol,
//   uricAcid,
//   optionalTests,
//   testReports,  // this now contains both filename & url
//   notes
// });


//     // Respond with data including the public file URLs
//     res.status(201).json({ success: true, data: newVitals });

//   } catch (error) {
//     console.error('Error adding vitals:', error);
//     res.status(500).json({ success: false, message: 'Failed to add vitals' });
//   }
// };

// backend/controllers/vitalsController.js
import createVitalsModel from '../models/vitalsModel.js';

export const addVitals = async (req, res) => {
  try {
    const Vitals = createVitalsModel(req.conn1);

    const {
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
      uricAcid,
      notes
    } = req.body;

    // Parse optionalTests JSON
    let optionalTests = [];
    if (req.body.optionalTests) {
      try {
        optionalTests = JSON.parse(req.body.optionalTests);
      } catch {
        return res.status(400).json({
          success: false,
          message: 'Invalid JSON format for optionalTests',
        });
      }
    }

    // Map Cloudinary uploaded files
    const testReports = (req.files || []).map(file => ({
      filename: file.originalname,
      url: file.path,          // Cloudinary file URL
      public_id: file.filename // Cloudinary public_id
    }));

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
      uricAcid,
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

// backend/controllers/vitalsController.js

export const getVitalsReports = async (req, res) => {
  try {
    const Vitals = createVitalsModel(req.conn1);
    const vitals = await Vitals.findById(req.params.id);

    if (!vitals || !vitals.testReports.length) {
      return res.status(404).json({ success: false, message: 'No reports found' });
    }

    res.json({
      success: true,
      reports: vitals.testReports.map(r => ({ name: r.filename, url: r.url }))
    });
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch reports' });
  }
};

