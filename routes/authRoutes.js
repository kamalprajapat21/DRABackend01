// // //working with local storage
// // // routes/authRoutes.js
// // import express from 'express';
// // import { checkuserexistance } from '../controllers/signupotpController.js';
// // import { checkuserexistance2 } from '../controllers/loginotpController.js';
// // import { createUserWithFirebaseToken } from '../controllers/signupotpController.js';
// // import { Signup1,Signup2,Signup3 } from '../controllers/signupdetailsController.js';
// // import multer from 'multer';
// // import path from 'path';
// // import mongoose from 'mongoose';
// // import { GridFsStorage } from 'multer-gridfs-storage';
// // import Grid from 'gridfs-stream';
// // import { firebaseTokenAuth } from '../controllers/firebaseAuthController.js';


// // const conn = mongoose.connection;
// // let gfs;
// // conn.once('open', () => {
// //   gfs = Grid(conn.db, mongoose.mongo);
// //   gfs.collection('uploads');
// // });

// // // Set up storage engine
// // const storage = new GridFsStorage({
// //   url: process.env.MONGO_URI_1,
// //   file: (req, file) => {
// //     return {
// //       filename: Date.now() + '-' + file.originalname,
// //       bucketName: 'uploads' // Should match the collection name
// //     };
// //   }
// // });
  
// //   const upload = multer({ storage: storage });
// // //   const upload = multer({ storage: storage });


// // const router = express.Router();

// // router.post('/signup/checkuserexistance', checkuserexistance);
// // // router.post('/signup/check-otp', checkOtp);

// // router.post('/login/checkuserexistance2', checkuserexistance2);
// // // router.post('/login/check-otp', checkOtp2);
// // router.post('/api/auth/signup/create-with-token', createUserWithFirebaseToken);

// // // router.post('/login/check-otp', checkOtp2);

// // //serverRoutes
// // router.post('/signup1', upload.single('labPhoto'), Signup1);
// // router.post('/signup2', upload.fields([
// //     { name: 'aadharCard', maxCount: 1 },
// //     { name: 'panCard', maxCount: 1 },
// //     { name: 'labLicense', maxCount: 1 },
// //     { name: 'gstCertificate', maxCount: 1 }
// //   ]), Signup2);
// //   router.post('/signup3', upload.single('uploadbankstatement'), Signup3);
// // //serverRoutes

// // router.post('/firebase-token', firebaseTokenAuth);
// // router.get('/test', (req, res) => res.json({ ok: true }));

// // export default router;





// // routes/authRoutes.js
// import express from 'express';
// import { checkuserexistance } from '../controllers/signupotpController.js';
// import { checkuserexistance2 } from '../controllers/loginotpController.js';
// import { createUserWithFirebaseToken } from '../controllers/signupotpController.js';
// import { Signup1, Signup2, Signup3 } from '../controllers/signupdetailsController.js';
// import { firebaseTokenAuth } from '../controllers/firebaseAuthController.js';
// import {upload} from '../middlewares/upload.js'; // ✅ use upload.js

// const router = express.Router();

// // OTP Auth
// router.post('/signup/checkuserexistance', checkuserexistance);
// router.post('/login/checkuserexistance2', checkuserexistance2);
// router.post('/api/auth/signup/create-with-token', createUserWithFirebaseToken);

// // Signup steps with file uploads
// router.post('/signup1', upload.single('labPhoto'), Signup1);
// router.post('/signup2', upload.fields([
//   { name: 'aadharCard', maxCount: 1 },
//   { name: 'panCard', maxCount: 1 },
//   { name: 'labLicense', maxCount: 1 },
//   { name: 'gstCertificate', maxCount: 1 }
// ]), Signup2);
// router.post('/signup3', upload.single('uploadbankstatement'), Signup3);

// // Firebase Token Testing
// router.post('/firebase-token', firebaseTokenAuth);
// router.get('/test', (req, res) => res.json({ ok: true }));

// export default router;



import express from 'express';
import { checkuserexistance } from '../controllers/signupotpController.js';
import { checkuserexistance2 } from '../controllers/loginotpController.js';
import { createUserWithFirebaseToken } from '../controllers/signupotpController.js';
import { Signup1, Signup2, Signup3 } from '../controllers/signupdetailsController.js';
import { firebaseTokenAuth } from '../controllers/firebaseAuthController.js';
import { upload } from '../middlewares/upload.js'; // ✅ Cloudinary-based upload

const router = express.Router();

router.post('/signup/checkuserexistance', checkuserexistance);
router.post('/login/checkuserexistance2', checkuserexistance2);
router.post('/signup/create-with-token', createUserWithFirebaseToken);

// ✅ Cloudinary upload routes
router.post('/signup1', upload.single('labPhoto'), Signup1);
router.post('/signup2', upload.fields([
  { name: 'aadharCard', maxCount: 1 },
  { name: 'panCard', maxCount: 1 },
  { name: 'labLicense', maxCount: 1 },
  { name: 'gstCertificate', maxCount: 1 },
]), Signup2);
router.post('/signup3', upload.single('uploadbankstatement'), Signup3);

router.post('/firebase-token', firebaseTokenAuth);
router.get('/test', (req, res) => res.json({ ok: true }));

export default router;
