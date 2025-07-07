// practice2
import express from 'express';
import { sendOtp, checkOtp } from '../controllers/otpController1.js';
import { downloadReport } from '../controllers/downloadReport.js';
import multer from 'multer';
import mongoose from 'mongoose';
import { GridFsStorage } from 'multer-gridfs-storage';
import Grid from 'gridfs-stream';
import { updateTimerData } from '../controllers/timerController.js';

const router = express.Router();

router.post('/sendotp/:labId', sendOtp);
router.post('/checkotp/:labId', checkOtp);
router.get('/timer/:labId', updateTimerData);
// router.post('/labreport/:labId', uploadReport);
// router.get('/downloadreport/:labreportId', downloadReport);

export default router;
import { uploadReport} from '../controllers/uploadReport.js';

//        await axios.post(`/api/otp/timer/${bookingId}`, {hours,minutes,seconds});





////SimpleLogic

// // routes/draOtpRoutes.js
// import express from 'express';
// import { sendOtpToPatient, verifyOtpFromPatient } from '../controllers/draOtpController.js';
// import { getServiceDuration } from '../controllers/serviceTimerController.js';

// const router = express.Router();

// router.post('/send', sendOtpToPatient);    // Body: { mobile }
// router.post('/verify', verifyOtpFromPatient); // Body: { mobile, otp }
// router.get('/service-timer/:mobile', getServiceDuration);


// export default router;

