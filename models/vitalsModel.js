// // // models/Vital.js
// // import mongoose from 'mongoose';

// // const optionalTestsSchema = new mongoose.Schema({
// //   typhoid: String,
// //   malaria: String,
// //   hepatitisB: String,
// //   syphilis: String,
// //   hepatitisC: String,
// //   hiv: String,
// //   dengueAntigen: String,
// //   cardiacTroponin: String,
// //   urine2P: String,
// // });

// // const vitalSchema = new mongoose.Schema({
// //   patientName: { type: String, required: true },
// //   bloodPressure: String,
// //   pulseOximeter: String,
// //   temperature: String,
// //   weight: String,
// //   height: String,
// //   bmi: String,
// //   ecg: String,
// //   bloodGlucose: String,
// //   haemoglobin: String,
// //   cholesterol: String,
// //   uricAcid: String,
// //   optionalTests: optionalTestsSchema,
// //   reports: [{ type: String }], // File paths
// //   notes: String,
// //   createdAt: { type: Date, default: Date.now },
// // });

// // export default (conn) => conn.model('Vital', vitalSchema);




// import mongoose from 'mongoose';

// const VitalsSchema = new mongoose.Schema({
//   patientName: { type: String, required: true },
//   bloodPressure: String,
//   pulseOximeter: String,
//   temperature: String,
//   weight: String,
//   height: String,
//   bmi: String,
//   ecg: String,
//   bloodGlucose: String,
//   haemoglobin: String,
//   cholesterol: String,
//   uricAcid: String,
//   notes: String,
//   typhoid: String,
//   malaria: String,
//   hepatitisB: String,
//   syphilis: String,
//   hepatitisC: String,
//   hiv: String,
//   dengueAntigen: String,
//   cardiacTroponin: String,
//   urine2P: String,
//   createdAt: { type: Date, default: Date.now }
// });

// export default mongoose.model('Vitals', VitalsSchema);



// // backend/models/vitalsModel.js
// import mongoose from 'mongoose';

// const VitalsSchema = new mongoose.Schema({
//   bookingId: { type: String, required: true }, // ✅ Replace patientId
//   bloodPressure: String,
//   heartRate: String,
//   temperature: String,
//   createdAt: { type: Date, default: Date.now }
// });

// export default (conn) => conn.model('Vitals', VitalsSchema);





// full updated code
// models/VitalsModel.js
import mongoose from 'mongoose';

// const OptionalTestSchema = new mongoose.Schema({
//   testName: String,
//   testResult: String,
// });

// const VitalsSchema = new mongoose.Schema({
//   bookingId: { type: String, required: true }, // Comes from Urgent Case Booking
//   patientName: { type: String, required: true },

//   bloodPressure: String,
//   pulseOximeter: String,
//   temperature: String,
//   weight: String,
//   height: String,
//   bmi: String,
//   ecg: String,
//   bloodGlucose: String,
//   haemoglobin: String,
//   cholesterol: String,

//   // Optional Tests
//   optionalTests: [OptionalTestSchema],

//   // Report upload (store file URL or filename)
//   testReportFile: { type: String },

//   // Notes
//   notes: { type: String },

//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });



const OptionalTestSchema = new mongoose.Schema({
  testName: String,
  testResult: String,
}, { _id: false });

const ReportSchema = new mongoose.Schema({
  filename: String,
  path: String,
}, { _id: false });

const VitalsSchema = new mongoose.Schema({
  bookingId: { type: String, required: true },
  patientName: { type: String, required: true },
  bloodPressure: String,
  pulseOximeter: String,
  temperature: String,
  weight: String,
  height: String,
  bmi: String,
  ecg: String,
  bloodGlucose: String,
  haemoglobin: String,
  cholesterol: String,
  optionalTests: [OptionalTestSchema],
  testReports: [ReportSchema],
  notes: String,
  createdAt: { type: Date, default: Date.now }
});


export default (conn) => conn.model('Vitals', VitalsSchema);


