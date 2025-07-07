// // // import mongoose from 'mongoose';

// // // const notificationSchema = new mongoose.Schema({
// // //   message: { type: String, required: true },
// // //   for: { type: String, enum: ['DRA', 'PWA'], required: true },
// // //   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
// // //   serviceType: String,
// // //   bookingId: String,
// // //   draName: String,
// // //   draId: String,
// // //   patientName: String,
// // //   patientId: String,
// // //   isRead: { type: Boolean, default: false },
// // //   createdAt: { type: Date, default: Date.now }
// // // });

// // // // models/Notification.js
// // // // export default (connection) =>
// // // //   connection.model('Notification', notificationSchema);


// // // const Notification =
// // //   mongoose.models.Notification || mongoose.model('Notification', notificationSchema);

// // // export default Notification;

// // export default (conn) => {
// //   const mongoose = conn;

// //   const schema = new mongoose.Schema({
// //     message: { type: String, required: true },
// //     for: { type: String, enum: ['DRA', 'PWA'], required: true },
// //     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
// //     serviceType: String,
// //     bookingId: String,
// //     draName: String,
// //     draId: String,
// //     patientName: String,
// //     patientId: String,
// //     isRead: { type: Boolean, default: false },
// //     createdAt: { type: Date, default: Date.now }
// //   });

// //   return mongoose.models.Notification || mongoose.model('Notification', schema);
// // };




// import mongoose from 'mongoose';

// export default (conn) => {
//   const schema = new mongoose.Schema({
//     message: { type: String, required: true },
//     for: { type: String, enum: ['DRA', 'PWA'], required: true },
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // ✅ FIXED
//     serviceType: String,
//     bookingId: String,
//     draName: String,
//     draId: String,
//     patientName: String,
//     patientId: String,
//     isRead: { type: Boolean, default: false },
//     createdAt: { type: Date, default: Date.now }
//   });

//   return conn.models.Notification || conn.model('Notification', schema);
// };





// import mongoose from 'mongoose';

// export default (conn) => {
//   const schema = new mongoose.Schema({
//     message: { type: String, required: true },
//     for: { type: String, enum: ['DRA', 'PWA'], required: true },
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     serviceType: String,
//     bookingId: String,
//     draName: String,
//     draId: String,
//     patientName: String,
//     patientId: String,
//     isRead: { type: Boolean, default: false },
//     createdAt: { type: Date, default: Date.now }
//   });

//   // ✅ Use mongoose.connection.models to check existence
//   return conn.modelNames().includes('Notification')
//     ? conn.model('Notification')
//     : conn.model('Notification', schema);
// };




// ✅ This file works perfectly with mongoose.createConnection()
import mongoose from 'mongoose';

export default (conn) => {
  const schema = new mongoose.Schema({
    message: { type: String, required: true },
    for: { type: String, enum: ['DRA', 'PWA'], required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    serviceType: String,
    bookingId: String,
    draName: String,
    draId: String,
    patientName: String,
    patientId: String,
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  });

  // ✅ Don't over-check. Just try to define it.
  try {
    return conn.model('Notification');
  } catch (err) {
    return conn.model('Notification', schema);
  }
};
