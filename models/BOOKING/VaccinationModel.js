// // //perfectly working code
// // import mongoose from 'mongoose';

// // const BookingSchema = new mongoose.Schema({  
// //   labacceptedBy: {type:String, default:"None"}, 
// //   labacceptedByid: { type: String },
// //   labId:String,
// //   bookingOtp:String,
// //   timerData:Number,
// //   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
// //   mobile: { type: String, ref: 'User'},
// //   Lab: [String],
// //   patientName: String,
// //   patientAge: Number,
// //   patientGender: String,
// //   startDate: String,
// //   details:String,
// //   prescriptionId: [mongoose.Schema.Types.ObjectId], // Changed to store file IDs
// //   timeslot: String,
// //   dhaCharge: { type: Number, default: 300 },
// //   Rank:String,
// //   status:String,
// //   bookingId:String
// // });

// // const LabSchema = new mongoose.Schema({
// //   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
// //   mobile: { type: String, ref: 'User', required: true },
// //   bookings: [BookingSchema]
// // });

// // export default (conn) => conn.model('Lab23', LabSchema);


// //perfectly working code
// import mongoose from 'mongoose';
// // import User1 from '../User1.js';

// // Define a sub-schema for the timer data
// const TimerSchema = new mongoose.Schema({
//   hours: { type: Number, default: 0 },
//   minutes: { type: Number, default: 0 },
//   seconds: { type: Number, default: 0 }
// });

// const BookingSchema = new mongoose.Schema({  
//   labacceptedBy: { type: String, default: "None" }, 
//   labacceptedByid: { type: String },
//   labownerId:String,
//   labownermobile:String,
//   labId: String,
//   bookingOtp: String,
//   // Storing hours, minutes, and seconds separately using the TimerSchema
//   timerData: { type: TimerSchema, default: () => ({ hours: 0, minutes: 0, seconds: 0 }) },
//   labreportId: [mongoose.Schema.Types.ObjectId], // Changed to store file IDs
//   prescriptionId: [mongoose.Schema.Types.ObjectId], // Store file IDs
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   mobile: { type: String, ref: 'User' },
//   Lab: [String],
//   patientName: String,
//   patientAge: Number,
//   patientGender: String,
//   startDate: String,
//   details: String,
//   timeslot: String,
//   dhaCharge:Number,
//   Rank: String,
//   status: String,
//   bookingId: String
// });

// const LabSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   mobile: { type: String, ref: 'User', required: true },
//   bookings: [BookingSchema]
// });

// export default (conn) => conn.model('vaccination10', LabSchema);




// // models/BOOKING/Vaccination.js
// import mongoose from 'mongoose';

// const TimerSchema = new mongoose.Schema({
//   hours: { type: Number, default: 0 },
//   minutes: { type: Number, default: 0 },
//   seconds: { type: Number, default: 0 }
// });

// const BookingSchema = new mongoose.Schema({
//   labacceptedBy: { type: String, default: "None" },
//   labacceptedByid: { type: String },
//   labownerId: String,
//   labownermobile: String,
//   labId: String,
//   bookingOtp: String,
//   timerData: { type: TimerSchema, default: () => ({ hours: 0, minutes: 0, seconds: 0 }) },
//   labreportId: [mongoose.Schema.Types.ObjectId],
//   prescriptionId: [mongoose.Schema.Types.ObjectId],
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   mobile: { type: String, ref: 'User' },
//   Lab: [String],
//   patientName: String,
//   patientAge: Number,
//   patientGender: String,
//   startDate: String,
//   details: String,
//   timeslot: String,
//   dhaCharge: Number,
//   Rank: String,
//   status: String,
//   bookingId: String
// });

// const LabSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   mobile: { type: String, ref: 'User', required: true },
//   bookings: [BookingSchema]
// });

// export default function createVaccinationModel(conn2) {
//   return conn2.model('vaccination10', LabSchema);
// }







// // models/BOOKING/Vaccination.js
// import mongoose from 'mongoose';

// const TimerSchema = new mongoose.Schema({
//   hours: { type: Number, default: 0 },
//   minutes: { type: Number, default: 0 },
//   seconds: { type: Number, default: 0 }
// });

// const BookingSchema = new mongoose.Schema({
//   draacceptedBy: { type: String, default: "None" },
//   draacceptedByid: { type: String },
//   // labownerId: String,
//   Dramobile: String,
//   draId: String,
//   bookingOtp: String,
//   timerData: { type: TimerSchema, default: () => ({ hours: 0, minutes: 0, seconds: 0 }) },
//   // labreportId: [mongoose.Schema.Types.ObjectId],
//   // prescriptionId: [mongoose.Schema.Types.ObjectId],
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   mobile: { type: String, ref: 'User' },
//   // Dra: [String],
//   patientName: String,
//   patientAge: Number,
//   patientGender: String,
//   startDate: String,
//   details: String,
//   timeslot: String,
//   dhaCharge: Number,
//   Rank: String,
//   status: String,
//   bookingId: String
// });

// const LabSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   mobile: { type: String, ref: 'User' },
//   bookings: [BookingSchema]
// });

// export default function createVaccinationModel(conn2) {
//   return conn2.model('vaccination10', LabSchema);
// }



// models/BOOKING/Vaccination.js
import mongoose from 'mongoose';

const TimerSchema = new mongoose.Schema({
  hours: { type: Number, default: 0 },
  minutes: { type: Number, default: 0 },
  seconds: { type: Number, default: 0 }
});

const BookingSchema = new mongoose.Schema({
  draacceptedBy: { type: String, default: "None" },
  draacceptedByid: { type: String },
  Dramobile: String,
  draId: String,
  bookingOtp: String,

  serviceStartTime: { type: Date }, // ✅ New field
  serviceEndTime: { type: Date },   // ✅ New field

  timerData: {
    type: TimerSchema,
    default: () => ({ hours: 0, minutes: 0, seconds: 0 })
  },

  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  mobile: { type: String, ref: 'User' },
  patientName: String,
  patientAge: Number,
  patientGender: String,
  startDate: String,
  details: String,
  timeslot: String,
  dhaCharge: Number,
  Rank: String,
  status: String,
  bookingId: String
});

const LabSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  mobile: { type: String, ref: 'User' },
  bookings: [BookingSchema]
});

export default function createVaccinationModel(conn2) {
  return conn2.model('vaccination10', LabSchema);
}
