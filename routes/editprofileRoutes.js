//practice
// routes/editprofileRoutes.js
import express from 'express';
import createUser1 from '../models/User1.js';
import multer from 'multer';
import path from 'path';
import mongoose from 'mongoose';
import { GridFsStorage } from 'multer-gridfs-storage';
import Grid from 'gridfs-stream';

const router = express.Router();

const conn = mongoose.connection;
let gfs;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Set up storage engine
const storage = new GridFsStorage({
  url: 'mongodb+srv://kamalprajapat7117:Dooper001@cluster0.vct0boe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  file: (req, file) => {
    return {
      filename: Date.now() + '-' + file.originalname,
      bucketName: 'uploads' // Should match the collection name
    };
  }
});

const upload = multer({ storage: storage });

router.get('/mobile/:mobileNumber', async (req, res) => {
  try {
    const User1 =createUser1(req.conn1)
    const { mobileNumber } = req.params;
    const user = await User1.findOne({ mobile: mobileNumber });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      fullName: user.fullName,
      labName: user.labName,
      labAddress1: user.labAddress1,
      labAddress2: user.labAddress2,
      city: user.city,
      state: user.state,
      labPhoto: user.labPhoto
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.patch('/mobile/:mobileNumber', upload.single('labPhoto'), async (req, res) => {
  try {
    const User1 =createUser1(req.conn1)
    const { mobileNumber } = req.params;
    const user = await User1.findOne({ mobile: mobileNumber });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.fullName = req.body.fullName || user.fullName;
    user.labName = req.body.labName || user.labName;
    user.labAddress1 = req.body.labAddress1 || user.labAddress1;
    user.labAddress2 = req.body.labAddress2 || user.labAddress2;
    user.city = req.body.city || user.city;
    user.state = req.body.state || user.state;

    // Update lab photo if a new file is uploaded
    if (req.file) {
      user.labPhoto = req.file.filename; // Save the filename or file ID to the user document
    }

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Endpoint to get the uploaded photo by filename
router.get('/files/:filename', async (req, res) => {
  try {
    const User1 =createUser1(req.conn1)
    const { filename } = req.params;
    const file = await gfs.files.findOne({ filename });
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    const readstream = gfs.createReadStream(file.filename);
    readstream.pipe(res);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
