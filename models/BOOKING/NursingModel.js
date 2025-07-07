


// // models/BOOKING/PwaHomeBooking.js
// import mongoose from 'mongoose';
// import { v4 as uuidv4 } from 'uuid';

// export default function createPwaNursingModel(conn2) {
//   const BookingSchema = new mongoose.Schema({
//     mobileNumber: String,
//     Lab: [String],
//     patientName: String,
//     careType: {
//       type: String,
//       enum: ['1Hour', '4Hour', '8Hour', '12Hour', '24Hour'],
//       default: "1Hour"
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
//     homeId: {
//       type: String,
//       default: () => uuidv4(),
//       unique: true
//     },
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

//   return conn2.model('Nursing23', LabSchema);
// }




// KamalCode
// models/BOOKING/PwaHomeBooking.js
import mongoose from 'mongoose';

export default function createPwaNursingModel(conn2) {
  const BookingSchema = new mongoose.Schema({
    mobileNumber: String,
    Lab: [String],
    patientName: { type: String, required: true },
    patientGender: String,
    careType: {
      type: String,
      enum: ['1Hour', '4Hour', '8Hour', '12Hour', '24Hour'],
      default: '1Hour',
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
      default: 'DHA Assigned',
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

  const NursingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bookings: [BookingSchema],
  });

  return conn2.models.Nursing23 || conn2.model('Nursing23', NursingSchema);
}
