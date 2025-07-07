// // File: models/UrgentCaseModel.js
// import mongoose from 'mongoose';

// const BookingSchema = new mongoose.Schema({
//   bookingId: { type: String, required: true },
//   mobileNumber: { type: String, required: true },
//   startOtp: String,
//   endOtp: String,
//   serviceStartedAt: Date,
//   serviceEndedAt: Date,
//   isServiceStarted: { type: Boolean, default: false },
//   isServiceEnded: { type: Boolean, default: false },
//   timerData: {
//     hours: { type: Number, default: 0 },
//     minutes: { type: Number, default: 0 },
//     seconds: { type: Number, default: 0 },
//   },
// });

// const UrgentCaseSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   bookings: [BookingSchema],
// });

// const UrgentCase = mongoose.model('UrgentCase', UrgentCaseSchema);
// export default UrgentCase;




// File: models/UrgentCaseModel.js
import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  // bookingId: { type: String }, // Optional: Remove or comment if not used anymore
  mobileNumber: { type: String, required: true },
  startOtp: String,
  endOtp: String,
  serviceStartedAt: Date,
  serviceEndedAt: Date,
  isServiceStarted: { type: Boolean, default: false },
  isServiceEnded: { type: Boolean, default: false },
  timerData: {
    hours: { type: Number, default: 0 },
    minutes: { type: Number, default: 0 },
    seconds: { type: Number, default: 0 },
  },
});

// Optional: Add unique index on mobileNumber within the array
BookingSchema.index({ mobileNumber: 1 }, { unique: true, sparse: true });

const UrgentCaseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bookings: [BookingSchema],
});

const UrgentCase = mongoose.model('UrgentCase', UrgentCaseSchema);
export default UrgentCase;
