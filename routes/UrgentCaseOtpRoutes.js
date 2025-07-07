// // practice2(WORKING_CODE)
// import express from 'express';
// import { sendOtp, checkOtp } from '../controllers/BOOKING/urgentotpControllerDRA.js';
// // import { sendOtp, checkOtp } from '../controllers/urgentotpControllerDRA.js';
// // import { sendOtp, checkOtp } from '../controllers/otpController1.js';
// // import { downloadReport } from '../controllers/downloadReport.js';
// // import multer from 'multer';
// // import mongoose from 'mongoose';
// // import { GridFsStorage } from 'multer-gridfs-storage';
// // import Grid from 'gridfs-stream';
// import { updateTimerData } from '../controllers/timerController.js';

// const router = express.Router();

// router.post('/sendotp/:draId', sendOtp);
// router.post('/checkotp/:draId', checkOtp);
// router.post('/timer/:draId', updateTimerData);
// // router.post('/labreport/:draId', uploadReport);
// // router.get('/downloadreport/:labreportId', downloadReport);

// export default router;
// // import { uploadReport} from '../controllers/uploadReport.js';

// //        await axios.post(`/api/otp/timer/${bookingId}`, {hours,minutes,seconds});
////eND WORKINGCODE



///aDD NEW CODE
import express from 'express';
import { sendOtp, verifyOtp, getTimerData } from '../controllers/BOOKING/urgentotpControllerDRA.js';
// import { sendOtp, verifyOtp } from '../../controllers/BOOKING/urgentotpControllerDRA.js';

const router = express.Router();

// Send OTP to patient
router.post('/send-otp/:bookingId/:type', sendOtp);

// Verify OTP (start/end)
router.post('/verify-otp/:bookingId/:type', verifyOtp);

// Fetch timer and status info from DRA
router.get('/urgent/timer/:bookingId', getTimerData);


export default router;