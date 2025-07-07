// //backend/models/BookingforUrgent.js
// import mongoose from 'mongoose';

// const bookingUrgentSchema = new mongoose.Schema({
//   bookingId: String,
//   date: String,
//   time: String,
//   labTests: [String],
//   patientName: String,
//   address: String,
//   charges: Number,
//   status: {
//     type: String,
//     enum: ['Pending', 'Completed', 'Reject', 'Incoming'],
//     default: 'Incoming'
//   }
// });

// // Static styles object
// const titleStyles = {
//   'Pending': {
//     color: 'black', // Red text color
//     backgroundColor: '#FDF0CC', // Yellow background color
//     // marginLeft: '53px'
//   },
//   'Completed': {
//     color: '#41B078', // Green text color
//     backgroundColor: '#f4fff1', // Blue background color
//     // marginLeft: '40px'
//   },
//   'Reject': {
//     color: '#000000', // Black text color
//     backgroundColor: '#FFFFFF', // White background color
//     // marginLeft: '40px'
//   },
//   'Incoming': {
//     color: '#000000', // Black text color
//     backgroundColor: '#FFFFFF', // White background color
//     // marginLeft: '40px'
//   }
//   // Add more titles and corresponding styles as needed
// };

// // Virtual for getting styles
// bookingUrgentSchema.virtual('styles').get(function() {
//   return titleStyles[this.status];
// });

// const BookingforUrgent = mongoose.model('BookingforUrgent', bookingUrgentSchema);

// export default BookingforUrgent;

//booking2
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  bookingId: String,
  date: String,
  time: String,
  labTests: [String],
  patientName: String,
  address: String,
  charges: Number,
  status: {
    type: String,
    enum: ["Pending", "Completed", "Reject", "Incoming"],
    default: "Incoming",
  },
});

const userBookingsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bookings: [bookingSchema],
});

export default (conn) => conn.model("UserBookings", userBookingsSchema);
