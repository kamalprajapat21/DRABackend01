import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const reportsDir = join(__dirname, 'uploads', 'reports');

if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}


import express from 'express';
import mongoose from 'mongoose';
import connectDB from './config/db.js';  
import authRoutes from './routes/authRoutes.js';
// import otpRoutes from './routes/draServiceRoutes.js';
import otpRoutes from './routes/otpRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import timerRoutes from './routes/timerRoutes.js'
import bookingRoutes from './routes/bookingRoutes.js';
import alertRoutes from './routes/alertRoutes.js';
import bookingserviceRoutes from './routes/bookingserviceRoutes.js';
import multer from 'multer';
import path from 'path';
import User from './models/User.js';
import User1 from './models/User1.js';
import getEarning from './routes/earningRoutes.js'
import withdrawRoutes from './routes/withdrawRoutes.js'
// yugalcode
import bankInfoRoutes from './routes/bankInfoRoutes.js';
import documentsRoutes from './routes/documentsRoutes.js';
import editprofileRoutes from './routes/editprofileRoutes.js';
import logoutRoutes from './routes/logoutRoutes.js';
import earningRoutes from './routes/earningRoutes.js';
import downloadreportRoutes from './routes/downloadreportRoutes.js'

// for showing the bookings
import SD from './routes/StandaloneServiceRoutes.js'
import viewprofileRoutes from './routes/viewprofileRoutes.js'
import videoRoutes from './routes/videoRoutes.js';
 
import vaccinationRoutes from './routes/Pharmacy/vaccinationRoutes.js'; // Import vaccination routes
import patientRoutes from './routes/Pharmacy/patientRoutes.js'


//DRA+PWA UrgentCaseRoutes
import urgentcase from './routes/urgentCaseRoutes.js';//Accept+Reject
import vitalRoutes from './routes/vitalRoutes.js';
import UrgentCaseOtp from './routes/UrgentCaseOtpRoutes.js'; // Import the OTP routes for urgent cases

// HomeServiceOTPapp
import homeOtpRoutes from './routes/HomeRotes/HomeCaseOtpRoutes.js'; // Import the route for home service OTP
import getPatientDetailsByBookingId from './routes/HomeRotes/pwaHomecareRoutes.js'; // Import the route for getting patient details by booking ID
import earningHomeRoutes from './routes/HomeRotes/earningRoutes.js'; // Import the route for homecare earnings

//NusingRoutes
import pwaNursingcareRoutes from './routes/NuringRoutes/pwaNursingcareRoutes.js';
import NursingCareOtpRoutes from './routes/NuringRoutes/NursingCareOtpRoutes.js'; // Import the route for nursing care OTP  


//VacinationRoutes
import VaccinationRoutes from './routes/VaccinationRoutes/VaccinationRoutes.js'; // Import the route for vaccination
import VaccinationOtpRoutes from './routes/VaccinationRoutes/VaccinationOtpRoutes.js'; // Import the route for vaccination OTP


// Notification
import { server, app } from './config/socket.js'; // Import socket.io server and app
import notificationRoutes from './routes/Notification/NotificationRoutes.js'; // Import notification routes




// import fs from 'fs';
const { conn1, conn2 } = await connectDB();
// const reportsDir = path.join(__dirname, 'uploads', 'reports');
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}
// const app = express();
app.use(bodyParser.json());
app.use(cors({origin: ['https://lab.dooper.in']}));

// aws setup
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);


// Connect to database
connectDB().then(({ conn1, conn2,conn3 }) => {
  // Global middleware to attach both connections to every request
   app.locals.conn1 = conn1;
  app.locals.conn2 = conn2;
  app.locals.conn3 = conn3;

  app.use((req, res, next) => {
  req.conn1 = conn1;
  req.conn2 = conn2;
  req.conn3 = conn3;
  next();
});


  // Define routes without individual middlewares


   //DRA+PWA routes
  app.use('/api/urgent', urgentcase);  /////UsrgentCase ke Liye
  app.use('/api/sd', SD); ///


  app.use('/api/documents', documentsRoutes);
  app.use('/api/auth', authRoutes);
app.use('/api/otp', otpRoutes); 
app.use('/api/urgent',UrgentCaseOtp);//ForUrgentcases




  // app.use('/api/otp', otpRoutes);
  app.use('/api/user', userRoutes);
  app.use('/api/timer', timerRoutes);
  app.use('/api/booking', bookingRoutes);
  app.use('/api/alerts', alertRoutes);
  app.use('/api/bookingservice', bookingserviceRoutes);
  app.use('/api/earning', earningRoutes);
  app.use('/api/withdraw', withdrawRoutes);
  // yugalcode routes
  app.use('/api/profile', editprofileRoutes);
  app.use('/api/bankinfo', bankInfoRoutes);
  app.use('/api/logout', logoutRoutes);
  app.use('/api/download', downloadreportRoutes);
  app.use('/api/viewprofile', viewprofileRoutes);

// app.use('/api/video', (req, res, next) => {
//   req.conn1 = conn1; // Attach DRA DB
//   next();
// }, videoRoutes);

app.use('/api/video', videoRoutes);


 

  //DRA + PWA Routes End


  //Add vital 
  app.use('/uploads', express.static('uploads')); // serve uploaded reports
app.use((req, res, next) => {
  // req.conn2 = dbConnect(); // inject db connection
  next();
});

app.use('/api', vitalRoutes);

app.use((err, req, res, next) => {
  if (err.message.includes('File too large')) {
    return res.status(400).json({ success: false, message: 'File too large. Max 10MB allowed.' });
  }

  if (err.message.includes('Only PDF and PNG files are allowed')) {
    return res.status(400).json({ success: false, message: 'Invalid file type. Only PDF and PNG allowed.' });
  }

  return res.status(500).json({ success: false, message: 'File upload error.', error: err.message });
});




 app.use((req, res, next) => {
 req.conn2 = conn2;
 next();
});
;


////Vaccination
  app.use('/api/vaccination', vaccinationRoutes);
app.use('/api/vaccin',VaccinationRoutes);
app.use('/api/v1',VaccinationOtpRoutes);

  app.use("/api", (req, res, next) => {
    req.conn1 ? next() : res.status(500).json({ message: "DRA DB not available" });
  }, earningRoutes);

app.use('/api/pwa', patientRoutes);
app.use('/api/homecare', getPatientDetailsByBookingId); ///Working for PWA Homecare
///HomeServiceOTPapp
app.use('/api/home',homeOtpRoutes);
app.use('/api/homeEarning',earningHomeRoutes);






///NusingRoutes
app.use('/api/nursing',pwaNursingcareRoutes);
app.use('/api/nurse',NursingCareOtpRoutes);





/////Notification
app.use('/api/notifications', notificationRoutes);
app.post('/api/test', (req, res) => {
  res.json({ message: '✅ /api/test works' });
});


  ////

 


 

  // Start server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}).catch(error => {
  console.error(`Error: ${error.message}`);
});







// /////Updated code Kamal
// // ===============================
// // Top-level Setup (Path + Uploads)
// // ===============================
// import { fileURLToPath } from 'url';
// import { dirname, join } from 'path';
// import fs from 'fs';
// import path from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// const reportsDir = join(__dirname, 'uploads', 'reports');

// if (!fs.existsSync(reportsDir)) {
//   fs.mkdirSync(reportsDir, { recursive: true });
// }

// // ===============================
// // Express + Middleware
// // ===============================
// import express from 'express';
// import cors from 'cors';
// import bodyParser from 'body-parser';
// import multer from 'multer';
// const app = express();

// app.use(bodyParser.json());
// app.use(cors({ origin: ['https://lab.dooper.in'] }));
// app.use('/uploads', express.static('uploads'));

// // ===============================
// // Import DB + Socket
// // ===============================
// import connectDB from './config/db.js';
// import { server } from './config/socket.js';

// // ===============================
// // Import All Routes
// // ===============================
// import authRoutes from './routes/authRoutes.js';
// import otpRoutes from './routes/otpRoutes.js';
// import userRoutes from './routes/userRoutes.js';
// import timerRoutes from './routes/timerRoutes.js';
// import bookingRoutes from './routes/bookingRoutes.js';
// import alertRoutes from './routes/alertRoutes.js';
// import bookingserviceRoutes from './routes/bookingserviceRoutes.js';
// import getEarning from './routes/earningRoutes.js';
// import withdrawRoutes from './routes/withdrawRoutes.js';
// import bankInfoRoutes from './routes/bankInfoRoutes.js';
// import documentsRoutes from './routes/documentsRoutes.js';
// import editprofileRoutes from './routes/editprofileRoutes.js';
// import logoutRoutes from './routes/logoutRoutes.js';
// import downloadreportRoutes from './routes/downloadreportRoutes.js';
// import viewprofileRoutes from './routes/viewprofileRoutes.js';
// import videoRoutes from './routes/videoRoutes.js';
// import SD from './routes/StandaloneServiceRoutes.js';

// import urgentcase from './routes/urgentCaseRoutes.js';
// import vitalRoutes from './routes/vitalRoutes.js';
// import UrgentCaseOtp from './routes/UrgentCaseOtpRoutes.js';

// import homeOtpRoutes from './routes/HomeRotes/HomeCaseOtpRoutes.js';
// import getPatientDetailsByBookingId from './routes/HomeRotes/pwaHomecareRoutes.js';
// import earningHomeRoutes from './routes/HomeRotes/earningRoutes.js';

// import pwaNursingcareRoutes from './routes/NuringRoutes/pwaNursingcareRoutes.js';
// import NursingCareOtpRoutes from './routes/NuringRoutes/NursingCareOtpRoutes.js';

// import vaccinationRoutes from './routes/Pharmacy/vaccinationRoutes.js';
// import patientRoutes from './routes/Pharmacy/patientRoutes.js';
// import VaccinationRoutes from './routes/VaccinationRoutes/VaccinationRoutes.js';
// import VaccinationOtpRoutes from './routes/VaccinationRoutes/VaccinationOtpRoutes.js';

// import notificationRoutes from './routes/Notification/NotificationRoutes.js';

// // ===============================
// // Start Server After DB Connect
// // ===============================
// const PORT = process.env.PORT || 5000;

// connectDB().then(({ conn1, conn2, conn3 }) => {
//   // Attach DBs globally (optional)
//   global.conn1 = conn1;
//   global.conn2 = conn2;
//   global.conn3 = conn3;

//   // Attach DBs to each request
//   app.use((req, res, next) => {
//     req.conn1 = conn1;
//     req.conn2 = conn2;
//     req.conn3 = conn3;
//     next();
//   });

//   // ===============================
//   // All Routes
//   // ===============================

//   app.use('/api/auth', authRoutes);
//   app.use('/api/otp', otpRoutes);
//   app.use('/api/user', userRoutes);
//   app.use('/api/timer', timerRoutes);
//   app.use('/api/booking', bookingRoutes);
//   app.use('/api/alerts', alertRoutes);
//   app.use('/api/bookingservice', bookingserviceRoutes);
//   app.use('/api/earning', getEarning);
//   app.use('/api/withdraw', withdrawRoutes);
//   app.use('/api/profile', editprofileRoutes);
//   app.use('/api/bankinfo', bankInfoRoutes);
//   app.use('/api/logout', logoutRoutes);
//   app.use('/api/download', downloadreportRoutes);
//   app.use('/api/viewprofile', viewprofileRoutes);
//   app.use('/api/video', videoRoutes);

//   app.use('/api/urgent', urgentcase);
//   app.use('/api/sd', SD);
//   app.use('/api/urgent', UrgentCaseOtp);

//   app.use('/api', vitalRoutes);

//   // Vaccination
//   app.use('/api/vaccination', vaccinationRoutes);
//   app.use('/api/vaccin', VaccinationRoutes);
//   app.use('/api/v1', VaccinationOtpRoutes);

//   // HomeCare
//   app.use('/api/pwa', patientRoutes);
//   app.use('/api/homecare', getPatientDetailsByBookingId);
//   app.use('/api/home', homeOtpRoutes);
//   app.use('/api/homeEarning', earningHomeRoutes);

//   // Nursing
//   app.use('/api/nursing', pwaNursingcareRoutes);
//   app.use('/api/nurse', NursingCareOtpRoutes);

//   // Notification (real-time)
//   app.use('/api/notifications', notificationRoutes);
// console.log('✅ /api/notifications route registered');

// app.post('/api/test', (req, res) => {
//   console.log('✅ POST /api/test hit');
//   res.json({ message: 'Test route working' });
// });


//   // ===============================
//   // Frontend + Static Build
//   // ===============================
//   const buildPath = path.join(__dirname, '../frontend/dist');
//   app.use(express.static(buildPath));

//   app.get('/', (req, res) => {
//     res.json({ message: 'Hello world' });
//   });

//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
//   });

//   // ===============================
//   // Start Server with Socket.io
//   // ===============================
//   server.listen(PORT, () => {
//     console.log(`🚀 Server started on port ${PORT}`);
//   });
// }).catch((error) => {
//   console.error(`❌ Server failed to start: ${error.message}`);
// });
