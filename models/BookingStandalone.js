//backend/models/BookingStandalone.js
import mongoose from 'mongoose';

const bookingStandaloneSchema = new mongoose.Schema({
  bookingId: String,
  date: String,
  time: String,
  labTests: [String],
  patientName: String,
  address: String,
  earnings: Number,
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Reject'],
    default: 'Pending'
  }
});

// Static styles object
const titleStyles = {
  'Pending': {
    color: 'black', // Red text color
    backgroundColor: '#FDF0CC', // Yellow background color
    // marginLeft: '53px'
  },
  'Completed': {
    color: '#41B078', // Green text color
    backgroundColor: '#f4fff1', // Blue background color
    // marginLeft: '40px'
  },
  'Reject': {
    color: '#000000', // Black text color
    backgroundColor: '#FFFFFF', // White background color
    // marginLeft: '40px'
  }
  // Add more titles and corresponding styles as needed
};

// Virtual for getting styles
bookingStandaloneSchema.virtual('styles').get(function() {
  return titleStyles[this.status];
});


export default (conn) => conn.model('BookingStandalone', bookingStandaloneSchema);
