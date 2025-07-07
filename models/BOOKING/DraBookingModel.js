// import mongoose from 'mongoose';

// const BookingSchema = new mongoose.Schema({

//   draId: { type: String },  // person who accepted
//   draName: { type: String },
//   draMobile: { type: String },
//   draBookingId: { type: String, required: true }, // unique
//   bookingOtp: { type: String }, // OTP field
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   patientName: String,
//   patientAge: Number,
//   symptoms: [String],
//   note: String,
//   status: { type: String, default: 'incoming' },

//    bookingOtp: { type: String }, // Start OTP
//   stopOtp: { type: String },    // Stop OTP
//   timerStart: { type: Date },
//   timerEnd: { type: Date },
//   serviceStatus: { type: String, enum: ['pending', 'started', 'completed'], default: 'pending' },
// });

// const DraBookingSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   mobile: { type: String },
//   bookings: [BookingSchema]
// });

// export default (conn1) => conn1.model('DraBooking', DraBookingSchema);






///
import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  draId: { type: String },
  draName: { type: String },
  draMobile: { type: String },
  bookingId: { type: String, required: true },
  bookingOtp: { type: String },
  stopOtp: { type: String },
  timerStart: { type: Date },
  timerEnd: { type: Date },
  serviceStatus: {
    type: String,
    enum: ['pending', 'started', 'completed'],
    default: 'pending',
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  patientName: String,
  patientAge: Number,
  symptoms: [String],
  note: String,
  status: { type: String, default: 'incoming' }
});

const DraBookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  mobile: { type: String },
  bookings: [BookingSchema]
});

export default (conn1) => conn1.model('DraBooking', DraBookingSchema,'urgentcases');
