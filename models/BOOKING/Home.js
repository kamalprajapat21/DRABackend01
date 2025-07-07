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


// // //perfectly working code
// // import mongoose from 'mongoose';
// // // import User1 from '../User1.js';

// // // Define a sub-schema for the timer data
// // const TimerSchema = new mongoose.Schema({
// //   hours: { type: Number, default: 0 },
// //   minutes: { type: Number, default: 0 },
// //   seconds: { type: Number, default: 0 }
// // });

// // const BookingSchema = new mongoose.Schema({  
// //   labacceptedBy: { type: String, default: "None" }, 
// //   labacceptedByid: { type: String },
// //   labownerId:String,
// //   labownermobile:String,
// //   labId: String,
// //   bookingOtp: String,
// //   // Storing hours, minutes, and seconds separately using the TimerSchema
// //   timerData: { type: TimerSchema, default: () => ({ hours: 0, minutes: 0, seconds: 0 }) },
// //   labreportId: [mongoose.Schema.Types.ObjectId], // Changed to store file IDs
// //   prescriptionId: [mongoose.Schema.Types.ObjectId], // Store file IDs
// //   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
// //   mobile: { type: String, ref: 'User' },
// //   Lab: [String],
// //   patientName: String,
// //   patientAge: Number,
// //   patientGender: String,
// //   startDate: String,
// //   details: String,
// //   timeslot: String,
// //   dhaCharge:Number,
// //   Rank: String,
// //   status: String,
// //   bookingId: String
// // });

// // const LabSchema = new mongoose.Schema({
// //   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
// //   mobile: { type: String, ref: 'User', required: true },
// //   bookings: [BookingSchema]
// // });

// // export default (conn) => conn.model('Home23', LabSchema);





// // import mongoose from 'mongoose';

// // // Optional: Timer support, if you want to add countdown for DHA/Service
// // const TimerSchema = new mongoose.Schema({
// //   hours: { type: Number, default: 0 },
// //   minutes: { type: Number, default: 0 },
// //   seconds: { type: Number, default: 0 }
// // });

// // const BookingSchema = new mongoose.Schema({
// //   mobileNumber: String,
// //   Lab: [String],
// //   patientName: String,
// //   careType: {
// //     type: String,
// //     enum: ['DailyBasis', 'WeeklyBasis', 'MonthlyBasis'],
// //     default: 'DailyBasis'
// //   },
// //   cost: Number,
// //   patientGender: String,
// //   startDate: String,
// //   prescriptionId: [mongoose.Schema.Types.ObjectId], // file IDs
// //   timeSlot: String,
// //   dhaCharge: { type: Number, default: 300 },
// //   Rank: {
// //     type: String,
// //     enum: ['Lab Assigned', 'DHA Service Started', 'DHA Assigned', 'Pharmacy Assigned'],
// //     default: 'Lab Assigned'
// //   },
// //   status: {
// //     type: String,
// //     enum: ['upcoming', 'Completed', 'Cancelled'],
// //     default: 'upcoming'
// //   },
// //   bookingOtp: { type: String }, // Added for OTP verification
// //   timerData: { type: TimerSchema, default: () => ({ hours: 0, minutes: 0, seconds: 0 }) },
// //   bookingId: { type: String, unique: true }
// // });

// // // Auto-generate bookingId on save
// // BookingSchema.pre('save', function (next) {
// //   if (this.isNew) {
// //     const namePart = this.patientName?.replace(/\s+/g, '').substring(0, 4).toUpperCase() || 'PATI';
// //     const randomPart = Math.floor(100000 + Math.random() * 900000).toString();
// //     this.bookingId = namePart + randomPart;
// //   }
// //   next();
// // });

// // const HomeCareSchema = new mongoose.Schema({
// //   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
// //   bookings: [BookingSchema]
// // });

// // // Use same pattern as lab.js for dynamic DB connection
// // export default (conn) => conn.model('Home23', HomeCareSchema);




// import mongoose from 'mongoose';

// // Timer schema to store countdown-like data
// const TimerSchema = new mongoose.Schema({
//   hours: { type: Number, default: 0 },
//   minutes: { type: Number, default: 0 },
//   seconds: { type: Number, default: 0 }
// });

// // Booking schema for Home Care
// const BookingSchema = new mongoose.Schema({
//   mobileNumber: { type: String, required: true },
//   Lab: [String],
//   patientName: { type: String, required: true },
//   careType: {
//     type: String,
//     enum: ['DailyBasis', 'WeeklyBasis', 'MonthlyBasis'],
//     default: 'DailyBasis'
//   },
//   cost: { type: Number, required: true },
//   patientGender: { type: String, required: true },
//   startDate: { type: String, required: true },
//   prescriptionId: [mongoose.Schema.Types.ObjectId], // GridFS file IDs
//   timeSlot: { type: String, required: true },
//   dhaCharge: { type: Number, default: 300 },
//   Rank: {
//     type: String,
//     enum: ['Lab Assigned', 'DHA Service Started', 'DHA Assigned', 'Pharmacy Assigned'],
//     default: 'Lab Assigned'
//   },
//   status: {
//     type: String,
//     enum: ['upcoming', 'Completed', 'Cancelled'],
//     default: 'upcoming'
//   },
//   bookingOtp: { type: String }, // For OTP verification
//   timerData: {
//     type: TimerSchema,
//     default: () => ({ hours: 0, minutes: 0, seconds: 0 })
//   },
//   bookingId: { type: String, unique: true }
// });

// // Auto-generate bookingId before saving
// BookingSchema.pre('save', function (next) {
//   if (this.isNew) {
//     const namePart = this.patientName?.replace(/\s+/g, '').substring(0, 4).toUpperCase() || 'PATI';
//     const randomPart = Math.floor(100000 + Math.random() * 900000).toString();
//     this.bookingId = namePart + randomPart;
//   }
//   next();
// });

// // Main HomeCare schema (per user)
// const HomeCareSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   mobile: { type: String, ref: 'User', required: true },
//   bookings: [BookingSchema]
// });

// // Export as dynamic model to support multi-db (like lab.js)
// export default (conn) => conn.model('Home23', HomeCareSchema);





// // models/BOOKING/PwaHomeBooking.js
// import mongoose from 'mongoose';
// // import { v4 as uuidv4 } from 'uuid';

// export default function createPwaHomeModel(conn2) {
//   const BookingSchema = new mongoose.Schema({
//     mobileNumber: String,
//     Lab: [String],
//     patientName: String,
//     careType: {
//       type: String,
//       enum: ['DailyBasis', 'WeeklyBasis', 'MonthlyBasis'],
//       default: 'DailyBasis'
//     },
//     cost: Number,
//     patientGender: String,
//     startDate: String,
//     prescriptionId: [mongoose.Schema.Types.ObjectId],
//     timeSlot: String,
//     dhaCharge: {
//       type: Number,
//       default: 300
//     },
//      draCaseAcceptedByid: { type: String, default: null },

//     Rank: {
//       type: String,
//       enum: ['Lab Assigned', 'DHA Service Started', 'DHA Assigned', 'Pharmacy Assigned'],
//       default: 'Lab Assigned'
//     },
//     status: {
//       type: String,
//       enum: ['upcoming', 'Completed', 'Cancelled'],
//       default: 'upcoming'
//     },
//     bookingId: {
//       type: String,
//       unique: true
//     }
//   });

//   BookingSchema.pre('save', function (next) {
//     if (this.isNew) {
//       const namePart = this.patientName.replace(/\s+/g, '').substring(0, 4).toUpperCase();
//       const randomPart = Math.floor(100000 + Math.random() * 900000).toString();
//       this.bookingId = namePart + randomPart;
//     }
//     next();
//   });

//   const LabSchema = new mongoose.Schema({
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true
//     },
//     bookings: [BookingSchema]
//   });

  
//   return conn2.model('Home23', LabSchema);
// }




// // HomeCareModel.js
// import mongoose from 'mongoose';
// import { v4 as uuidv4 } from 'uuid';

// const BookingSchema = new mongoose.Schema({
//   mobileNumber: String,
//   Lab: [String],
//   patientName: String,
//   careType: {
//     type: String,
//     enum: ['DailyBasis', 'WeeklyBasis', 'MonthlyBasis'],
//     default: 'DailyBasis',
//   },
//   cost: Number,
//   patientGender: String,
//   startDate: String,
//   prescriptionId: [mongoose.Schema.Types.ObjectId],
//   timeSlot: String,
//   dhaCharge: {
//     type: Number,
//     default: 300,
//   },
//   draId: {
//     type: String,
//     // default: () => uuidv4(),
//     // unique: false,
//   },
//   Rank: {
//     type: String,
//     enum: ['Lab Assigned', 'DHA Service Started', 'DHA Assigned', 'Pharmacy Assigned'],
//     default: 'Lab Assigned',
//   },
//   status: {
//     type: String,
//     enum: ['incoming', 'pending', 'Completed', 'Cancelled'],
//     default: 'incoming',
//   },
//   bookingId: {
//     type: String,
//     // unique: true,
//   },
//   draAcceptedById: { type: String, default: null },
//   draRejectedBy: { type: [String], default: [] },
// });

// BookingSchema.pre('save', function (next) {
//   if (this.isNew) {
//     const namePart = this.patientName.replace(/\s+/g, '').substring(0, 4).toUpperCase();
//     const randomPart = Math.floor(100000 + Math.random() * 900000).toString();
//     this.bookingId = namePart + randomPart;
//   }
//   next();
// });

// const HomeCareSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   bookings: [BookingSchema],
// });

// export default function createHomeCareModel(conn) {
//   return conn.models.Home23 || conn.model('Home23', HomeCareSchema);
// }





// // models/BOOKING/HomeCareModel.js
// import mongoose from 'mongoose';
// import { v4 as uuidv4 } from 'uuid';

// const BookingSchema = new mongoose.Schema({
//   mobileNumber: String,
//   Lab: [String],
//   patientName: String,
//   careType: {
//     type: String,
//     enum: ['DailyBasis', 'WeeklyBasis', 'MonthlyBasis'],
//     default: 'DailyBasis',
//   },
//   cost: Number,
//   patientGender: String,
//   startDate: String,
//   prescriptionId: [mongoose.Schema.Types.ObjectId],
//   timeSlot: String,
//   dhaCharge: {
//     type: Number,
//     default: 300,
//   },
//   draId: {
//     type: String,
//     default: null // ✅ No unique constraint
//   },
//   draAcceptedById: {
//     type: String,
//     default: null
//   },
//   draRejectedBy: {
//     type: [String],
//     default: []
//   },
//   Rank: {
//     type: String,
//     enum: ['Lab Assigned', 'DHA Service Started', 'DHA Assigned', 'Pharmacy Assigned'],
//     default: 'Lab Assigned',
//   },
//   status: {
//     type: String,
//     enum: ['incoming', 'pending', 'Completed', 'Cancelled'],
//     default: 'incoming',
//   },
//   bookingId: {
//     type: String,
//     // default: () => uuidv4() // ✅ No unique constraint
//   }
// }, { autoIndex: false });

// BookingSchema.pre('save', function (next) {
//   if (this.isNew) {
//     const namePart = this.patientName?.replace(/\s+/g, '').substring(0, 4).toUpperCase() || 'HOME';
//     const randomPart = Math.floor(100000 + Math.random() * 900000).toString();
//     this.bookingId = namePart + randomPart;
//   }
//   next();
// });

// const HomeCareSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   bookings: [BookingSchema],
// });

// export default function createHomeCareModel(conn) {
//   return conn.models.Home23 || conn.model('Home23', HomeCareSchema);
// }






//KamalCode start

// models/BOOKING/HomeCareModel.js
import mongoose from 'mongoose';


const BookingSchema = new mongoose.Schema({
  mobileNumber: String,
  Lab: [String],
  patientName: { type: String, required: true },
  patientGender: String,
  careType: {
    type: String,
    enum: ['DailyBasis', 'WeeklyBasis', 'MonthlyBasis'],
    default: 'DailyBasis',
  },
  startDate: String,
  timeSlot: String,
  cost: Number,
  dhaCharge: { type: Number, default: 300 },
  prescriptionId: [mongoose.Schema.Types.ObjectId],

  draId: { type: String, default: null },
  draAcceptedById: { type: String, default: null },
  draRejectedBy: { type: [String], default: [] },

  bookingOtpStart: { type: String },
  bookingOtpEnd: { type: String },
   serviceStartTime: { type: Date },
  serviceEndTime: { type: Date },
  timerData: {
    hours: { type: Number, default: 0 },
    minutes: { type: Number, default: 0 },
    seconds: { type: Number, default: 0 },
  },

  bookingId: { type: String, unique: true },
  status: {
    type: String,
    enum: ['incoming', 'pending', 'completed', 'cancelled'],
    default: 'incoming',
  },
  Rank: {
    type: String,
    enum: ['Lab Assigned', 'DHA Service Started', 'DHA Assigned', 'Pharmacy Assigned'],
    default: 'Lab Assigned',
  },
  createdAt: { type: Date, default: Date.now },
});



// Generate unique bookingId before save
BookingSchema.pre('save', function (next) {
  if (this.isNew && !this.bookingId) {
    const namePart = this.patientName?.replace(/\s+/g, '').substring(0, 4).toUpperCase() || 'HOME';
    const genderPart = this.patientGender?.substring(0, 1).toUpperCase() || 'X';
    const randomPart = Math.floor(100000 + Math.random() * 900000).toString();
    this.bookingId = `${namePart}${genderPart}${randomPart}`;
  }
  next();
});

const HomeCareSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bookings: [BookingSchema],
});

export default function createHomeCareModel(conn) {
  return conn.models.Home23 || conn.model('Home23', HomeCareSchema);
}

//KamalCode End