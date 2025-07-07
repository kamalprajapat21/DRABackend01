// import mongoose from "mongoose";
// import { v4 as uuidv4 } from "uuid";

// const BookingSchema = new mongoose.Schema({
//   urgentCaseAcceptedByid: { type: String, default: null },
//   mobileNumber: String,
//   symptoms: {
//     type: [String],
//     required: true,
//   },
//   bookingId: { type: String, unique: true },
//   patientBookingId: { type: String, unique: true },
//   patientName: { type: String, required: true },
//   patientAge: Number,
//   patientsNote: { type: String, default: "" },
//   videoNote: { type: String },
//   videoFileId: { type: mongoose.Schema.Types.ObjectId },
//   Rank: {
//     type: String,
//     enum: ["ToBeChanged1", "ToBeChanged2", "ToBeChanged3"],
//     default: "ToBeChanged1",
//   },
//   status: {
//     type: String,
//     enum: ["incoming", "completed", "cancelled", "pending"],
//     default: "incoming",
//   },
//   urgentCharges: { type: Number, default: 999 },
//   draRejectedBy: {
//     type: [String],
//     default: [],
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// BookingSchema.pre("save", function (next) {
//   if (this.isNew) {
//     const namePart = this.patientName?.replace(/\s+/g, "").substring(0, 4).toUpperCase() || "CASE";
//     const agePart = this.patientAge?.toString().slice(0, 2) || "00";
//     const randomPart = Math.floor(1000 + Math.random() * 9000).toString();
//     this.bookingId = namePart + agePart + randomPart;
//   }
//   next();
// });

// const UrgentCaseSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   bookings: [BookingSchema],
// });

// // ✅ Export function that returns model from a specific connection
// export default function createLab(conn1) {
//   return conn1.models.UrgentCase || conn1.model("UrgentCase", UrgentCaseSchema);
// }

// //conn -> DRA
// // Conn2 -> PWA




// import mongoose from "mongoose";

// // Define the Booking sub-schema
// const BookingSchema = new mongoose.Schema({
//   urgentCaseAcceptedByid: { type: String, default: null },
//   mobileNumber: String,
//   symptoms: {
//     type: [String],
//     required: true,
//   },
//   bookingId: { type: String, unique: true },
//   patientBookingId: { type: String, unique: true },
//   patientName: { type: String, required: true },
//   patientAge: Number,
//   patientsNote: { type: String, default: "" },
//   videoNote: { type: String },
//   videoFileId: { type: mongoose.Schema.Types.ObjectId },

//   Rank: {
//     type: String,
//     enum: ["ToBeChanged1", "ToBeChanged2", "ToBeChanged3"],
//     default: "ToBeChanged1",
//   },

//   status: {
//     type: String,
//     enum: ["incoming", "completed", "cancelled", "pending"],
//     default: "incoming",
//   },

//   urgentCharges: { type: Number, default: 999 },

//   draRejectedBy: {
//     type: [String],
//     default: [],
//   },

//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// // Auto-generate bookingId when saving new booking
// BookingSchema.pre("save", function (next) {
//   if (this.isNew) {
//     const namePart = this.patientName?.replace(/\s+/g, "").substring(0, 4).toUpperCase() || "CASE";
//     const agePart = this.patientAge?.toString().slice(0, 2) || "00";
//     const randomPart = Math.floor(1000 + Math.random() * 9000).toString();
//     this.bookingId = namePart + agePart + randomPart;
//   }
//   next();
// });

// // Define the parent UrgentCase schema
// const UrgentCaseSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   mobile: { type: String, ref: "User" },
//   bookings: [BookingSchema],
// });

// // ✅ Exporting model creation function (factory)
// export default (conn) => conn.model("UrgentCase", UrgentCaseSchema);





// ✅ UrgentCaseModel.js (Model)
import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  urgentCaseAcceptedByid: { type: String, default: null },
  mobileNumber: String,
  symptoms: { type: [String], required: true },
  bookingId: { type: String, unique: true },
  patientBookingId: { type: String, unique: true },
  patientName: { type: String, required: true },
  patientAge: Number,
  patientsNote: { type: String, default: '' },
  videoNote: { type: String },
  videoFileId: { type: mongoose.Schema.Types.ObjectId },
  
  Rank: {
    type: String,
    enum: ['ToBeChanged1', 'ToBeChanged2', 'ToBeChanged3'],
    default: 'ToBeChanged1',
  },
  status: {
    type: String,
    enum: ['incoming', 'pending', 'completed', 'cancelled'],
    default: 'incoming',
  },
  bookingOtpStart: { type: String },
  bookingOtpEnd: { type: String },
  serviceStartTime: { type: Date },
  serviceEndTime: { type: Date },
  timerData: {
    hours: { type: Number, default: 0 },
    minutes: { type: Number, default: 0 },
    seconds: { type: Number, default: 0 },
  },
  urgentCharges: { type: Number, default: 999 },
  draRejectedBy: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
});

BookingSchema.pre('save', function (next) {
  if (this.isNew) {
    const namePart = this.patientName?.replace(/\s+/g, '').substring(0, 4).toUpperCase() || 'CASE';
    const agePart = this.patientAge?.toString().slice(0, 2) || '00';
    const randomPart = Math.floor(1000 + Math.random() * 9000).toString();
    this.bookingId = namePart + agePart + randomPart;
  }
  next();
});

const UrgentCaseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bookings: [BookingSchema],
});

export default function createUrgentCaseModel(conn) {
  return conn.models.UrgentCase || conn.model('UrgentCase', UrgentCaseSchema);
}