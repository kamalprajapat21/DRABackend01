import express from 'express';
import User1 from '../models/User1.js';
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

// Endpoint to get the uploaded photo by filename
router.get('/:filename', async (req, res) => {
    try {
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
  