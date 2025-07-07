// import express from 'express';
// import multer from 'multer';
// import { uploadVitals } from '../controllers/vitalController.js';

// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, 'uploads/reports/'),
//   filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
// });
// const upload = multer({ storage });

// router.post('/vitals', upload.array('reports'), uploadVitals);

// export default router;


// import express from 'express';
// import { addVitals } from '../controllers/vitalsController.js';

// const router = express.Router();

// router.post('/vitals', addVitals);


// export default router;




// updateSheemacode

// routes/vitalRoutes.js
import express from 'express';
import multer from 'multer';
import { addVitals } from '../controllers/vitalsController.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/reports/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

router.post('/vitals', upload.single('testReport'), addVitals);

export default router;
