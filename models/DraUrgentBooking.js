// // models/DraUrgentBooking.js
// import mongoose from 'mongoose';

// const draUrgentSchema = new mongoose.Schema({
//   userId: String,
//   draId: String,
//   status: String,
//   description: String,
//   videoNote: String, // e.g. 'note123.mp4'
//   videoFileId: mongoose.Schema.Types.ObjectId, // GridFS or file storage reference
//   createdAt: { type: Date, default: Date.now },
// });

// export const getDraUrgentModel = (conn1) =>
//   conn1.model('DraUrgent', draUrgentSchema);







import mongoose from 'mongoose';

const draUrgentSchema = new mongoose.Schema({
  userId: String,
  status: String,
  draId: String,
  description: String,
  videoNote: String,                     // Optional filename
  videoFileId: mongoose.Schema.Types.ObjectId,  // Optional for GridFS
  createdAt: { type: Date, default: Date.now },
});

// Register dynamically
export const getDraUrgentModel = (conn) => {
  return conn.models.DraUrgent || conn.model('DraUrgent', draUrgentSchema);
};
