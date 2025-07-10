// // routes/documentsRoutes.js
// import express from 'express';
// import User1 from '../models/User1.js';
// import multer from 'multer';
// import mongoose from 'mongoose';
// import { GridFsStorage } from 'multer-gridfs-storage';
// import Grid from 'gridfs-stream';

// const router = express.Router();

// const conn = mongoose.connection;
// let gfs;
// conn.once('open', () => {
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection('uploads');
// });

// // Set up storage engine
// const storage = new GridFsStorage({
//   url: 'mongodb+srv://dooper:zaKnkcwomfgnzy0j@cluster0.baaa2xr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
//   file: (req, file) => {
//     return {
//       filename: Date.now() + '-' + file.originalname,
//       bucketName: 'uploads' // Should match the collection name
//     };
//   }
// });

// const upload = multer({ storage: storage });

// const getFile = async (filename, res) => {
//   try {
//     const gfs = new mongoose.mongo.GridFSBucket(conn.db, {
//       bucketName: 'uploads'
//     });

//     const files = await gfs.find({ filename }).toArray();

//     if (!files || files.length === 0) {
//       return res.status(404).json({ error: 'No files exist' });
//     }

//     gfs.openDownloadStreamByName(filename).pipe(res);
//   } catch (error) {
//     res.status(500).json({ error: 'Server Error' });
//   }
// };

// router.get('/mobile/:mobileNumber', async (req, res) => {
//   try {
//     const { mobileNumber } = req.params;
//     const user = await User1.findOne({ mobile: mobileNumber });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.json({
//       aadharCard: user.aadharCard,
//       panCard: user.panCard,
//       labLicense: user.labLicense,
//       labEstablishedLicense: user.labEstablishedLicense,
//       nablLicense: user.nablLicense,
//       gstCertificate: user.gstCertificate
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// router.get('/file/:filename', async (req, res) => {
//   const { filename } = req.params;
//   await getFile(filename, res);
// });

// const handlePatchOrPut = async (req, res) => {
//   try {
//     const { mobileNumber } = req.params;
//     const user = await User1.findOne({ mobile: mobileNumber });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Update fields if new values are provided
//     if (req.files.aadharCard) {
//       user.aadharCard = req.files.aadharCard[0].filename; // Save the filename instead of path
//     }
//     if (req.files.panCard) {
//       user.panCard = req.files.panCard[0].filename; // Save the filename instead of path
//     }
//     if (req.files.labLicense) {
//       user.labLicense = req.files.labLicense[0].filename; // Save the filename instead of path
//     }
//     if (req.files.labEstablishedLicense) {
//       user.labEstablishedLicense = req.files.labEstablishedLicense[0].filename; // Save the filename instead of path
//     }
//     if (req.files.nablLicense) {
//       user.nablLicense = req.files.nablLicense[0].filename; // Save the filename instead of path
//     }
//     if (req.files.gstCertificate) {
//       user.gstCertificate = req.files.gstCertificate[0].filename; // Save the filename instead of path
//     }

//     const updatedUser = await user.save();
//     res.json(updatedUser);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// router.patch('/mobile/:mobileNumber', upload.fields([
//   { name: 'aadharCard', maxCount: 1 },
//   { name: 'panCard', maxCount: 1 },
//   { name: 'labLicense', maxCount: 1 },
//   { name: 'labEstablishedLicense', maxCount: 1 },
//   { name: 'nablLicense', maxCount: 1 },
//   { name: 'gstCertificate', maxCount: 1 }
// ]), handlePatchOrPut);

// router.put('/mobile/:mobileNumber', upload.fields([
//   { name: 'aadharCard', maxCount: 1 },
//   { name: 'panCard', maxCount: 1 },
//   { name: 'labLicense', maxCount: 1 },
//   { name: 'labEstablishedLicense', maxCount: 1 },
//   { name: 'nablLicense', maxCount: 1 },
//   { name: 'gstCertificate', maxCount: 1 }
// ]), handlePatchOrPut);

// export default router;


// // routes/documentsRoutes.js
// import express from 'express';
// import User1 from '../models/User1.js';
// import multer from 'multer';
// import mongoose from 'mongoose';
// import { GridFsStorage } from 'multer-gridfs-storage';
// import Grid from 'gridfs-stream';

// const router = express.Router();

// // MongoDB connection string
// const mongoURI = 'mongodb+srv://dooper:zaKnkcwomfgnzy0j@cluster0.baaa2xr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// // Create a new connection using the connection string
// const conn = mongoose.createConnection(mongoURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// let gfs;
// conn.once('open', () => {
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection('uploads'); // Set the collection to 'uploads'
// });

// // Set up GridFs storage engine
// const storage = new GridFsStorage({
//   url: mongoURI, // Provide the connection link directly here
//   file: (req, file) => {
//     return {
//       filename: Date.now() + '-' + file.originalname,
//       bucketName: 'uploads', // Should match the collection name
//     };
//   },
// });

// const upload = multer({ storage: storage });

// // Helper function to get file by filename
// const getFile = async (filename, res) => {
//   try {
//     const gfs = new mongoose.mongo.GridFSBucket(conn.db, {
//       bucketName: 'uploads',
//     });

//     const files = await gfs.find({ filename }).toArray();

//     if (!files || files.length === 0) {
//       return res.status(404).json({ error: 'No files exist' });
//     }

//     gfs.openDownloadStreamByName(filename).pipe(res);
//   } catch (error) {
//     res.status(500).json({ error: 'Server Error' });
//   }
// };

// // Route to get user details by mobile number
// router.get('/mobile/:mobileNumber', async (req, res) => {
//   try {
//     const { mobileNumber } = req.params;
//     const user = await User1.findOne({ mobile: mobileNumber });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.json({
//       aadharCard: user.aadharCard,
//       panCard: user.panCard,
//       labLicense: user.labLicense,
//       labEstablishedLicense: user.labEstablishedLicense,
//       nablLicense: user.nablLicense,
//       gstCertificate: user.gstCertificate,
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Route to get a file by its filename
// router.get('/file/:filename', async (req, res) => {
//   const { filename } = req.params;
//   await getFile(filename, res);
// });

// // Function to handle PATCH or PUT requests for updating user files
// const handlePatchOrPut = async (req, res) => {
//   try {
//     const { mobileNumber } = req.params;
//     const user = await User1.findOne({ mobile: mobileNumber });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Update fields if new files are provided
//     if (req.files.aadharCard) {
//       user.aadharCard = req.files.aadharCard[0].filename;
//     }
//     if (req.files.panCard) {
//       user.panCard = req.files.panCard[0].filename;
//     }
//     if (req.files.labLicense) {
//       user.labLicense = req.files.labLicense[0].filename;
//     }
//     if (req.files.labEstablishedLicense) {
//       user.labEstablishedLicense = req.files.labEstablishedLicense[0].filename;
//     }
//     if (req.files.nablLicense) {
//       user.nablLicense = req.files.nablLicense[0].filename;
//     }
//     if (req.files.gstCertificate) {
//       user.gstCertificate = req.files.gstCertificate[0].filename;
//     }

//     const updatedUser = await user.save();
//     res.json(updatedUser);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Routes for updating user documents using PATCH or PUT
// router.patch('/mobile/:mobileNumber', upload.fields([
//   { name: 'aadharCard', maxCount: 1 },
//   { name: 'panCard', maxCount: 1 },
//   { name: 'labLicense', maxCount: 1 },
//   { name: 'labEstablishedLicense', maxCount: 1 },
//   { name: 'nablLicense', maxCount: 1 },
//   { name: 'gstCertificate', maxCount: 1 },
// ]), handlePatchOrPut);

// router.put('/mobile/:mobileNumber', upload.fields([
//   { name: 'aadharCard', maxCount: 1 },
//   { name: 'panCard', maxCount: 1 },
//   { name: 'labLicense', maxCount: 1 },
//   { name: 'labEstablishedLicense', maxCount: 1 },
//   { name: 'nablLicense', maxCount: 1 },
//   { name: 'gstCertificate', maxCount: 1 },
// ]), handlePatchOrPut);

// export default router;

// routes/documentsRoutes.js
import express from 'express';
import createUser1 from '../models/User1.js';
import multer from 'multer';
import mongoose from 'mongoose';
import { GridFsStorage } from 'multer-gridfs-storage';
import Grid from 'gridfs-stream';


const router = express.Router();

// MongoDB connection string
const mongoURI = process.env.MONGO_URI_1;

// Create a new connection using the connection string
const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfs;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads'); // Set the collection to 'uploads'
});

// Set up GridFs storage engine
const storage = new GridFsStorage({
  url: mongoURI, // Provide the connection link directly here
  file: (req, file) => {
    return {
      filename: Date.now() + '-' + file.originalname,
      bucketName: 'uploads', // Should match the collection name
    };
  },
});

const upload = multer({ storage: storage });

// Helper function to get file by filename
const getFile = async (filename, res) => {
  try {
    const gfs = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: 'uploads',
    });

    const files = await gfs.find({ filename }).toArray();

    if (!files || files.length === 0) {
      return res.status(404).json({ error: 'No files exist' });
    }

    gfs.openDownloadStreamByName(filename).pipe(res);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Route to get user details by mobile number
router.get('/mobile/:mobileNumber', async (req, res) => {
  try {
    const User1= createUser1(req.conn1)
    const { mobileNumber } = req.params;
    const user = await User1.findOne({ mobile: mobileNumber });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      aadharCard: user.aadharCard,
      panCard: user.panCard,
      labLicense: user.labLicense,
      labEstablishedLicense: user.labEstablishedLicense,
      nablLicense: user.nablLicense,
      gstCertificate: user.gstCertificate,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Route to get a file by its filename
router.get('/file/:filename', async (req, res) => {
  
  const { filename } = req.params;
  await getFile(filename, res);
});

// Function to handle PATCH or PUT requests for updating user files
const handlePatchOrPut = async (req, res) => {
  try {
    const User1= createUser1(req.conn1)

    const { mobileNumber } = req.params;
    const user = await User1.findOne({ mobile: mobileNumber });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields if new files are provided
    if (req.files.aadharCard) {
      user.aadharCard = req.files.aadharCard[0].filename;
    }
    if (req.files.panCard) {
      user.panCard = req.files.panCard[0].filename;
    }
    if (req.files.labLicense) {
      user.labLicense = req.files.labLicense[0].filename;
    }
    if (req.files.labEstablishedLicense) {
      user.labEstablishedLicense = req.files.labEstablishedLicense[0].filename;
    }
    if (req.files.nablLicense) {
      user.nablLicense = req.files.nablLicense[0].filename;
    }
    if (req.files.gstCertificate) {
      user.gstCertificate = req.files.gstCertificate[0].filename;
    }

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Routes for updating user documents using PATCH or PUT
router.patch('/mobile/:mobileNumber', upload.fields([
  { name: 'aadharCard', maxCount: 1 },
  { name: 'panCard', maxCount: 1 },
  { name: 'labLicense', maxCount: 1 },
  { name: 'labEstablishedLicense', maxCount: 1 },
  { name: 'nablLicense', maxCount: 1 },
  { name: 'gstCertificate', maxCount: 1 },
]), handlePatchOrPut);

router.put('/mobile/:mobileNumber', upload.fields([
  { name: 'aadharCard', maxCount: 1 },
  { name: 'panCard', maxCount: 1 },
  { name: 'labLicense', maxCount: 1 },
  { name: 'labEstablishedLicense', maxCount: 1 },
  { name: 'nablLicense', maxCount: 1 },
  { name: 'gstCertificate', maxCount: 1 },
]), handlePatchOrPut);

export default router;
