// import mongoose from 'mongoose';

// const vaccinationServiceSchema = new mongoose.Schema({
//   prescription: String,
// });

// export default mongoose.model('addreportcard2', vaccinationServiceSchema);


//practice 2
import mongoose from 'mongoose';

const reportCardSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  files: [{
    fileId: { type: mongoose.Schema.Types.ObjectId, required: true },
    filename: { type: String, required: true }
  }]
});

// export default mongoose.model('addreportcard2', reportCardSchema);

export default (conn) => conn.model('addreportcard2', reportCardSchema);
