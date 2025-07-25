import mongoose from 'mongoose';
import Grid from 'gridfs-stream';

// Controller to retrieve prescription by ID
export const getPrescriptionById = async (req, res) => {
  const { id } = req.params;

  // Ensure we have access to the correct database connection
  const db = req.db;

  if (!db) {
    console.error('Database connection not found in request');
    return res.status(500).json({ error: 'Database connection not found' });
  }

  let gfs;
  try {
    // Initialize GridFS using the database connection from the request
    gfs = Grid(db.db, mongoose.mongo);
    gfs.collection('uploads');
  } catch (error) {
    console.error('Failed to initialize GridFS:', error);
    return res.status(500).json({ error: 'Failed to initialize GridFS' });
  }

  // Check if the ID is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.error('Invalid ID format');
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  try {
    // Find the file by ID in GridFS
    const file = await gfs.files.findOne({ _id: mongoose.Types.ObjectId(id) });

    if (!file) {
      console.error('File not found');
      return res.status(404).json({ error: 'File not found' });
    }

    // Set appropriate content type for the file
    res.set('Content-Type', file.contentType);
    res.set('Content-Disposition', 'attachment; filename=' + file.filename);

    // Create a read stream from the GridFS bucket and pipe it to the response
    const readStream = gfs.createReadStream({ _id: id });

    readStream.on('error', (err) => {
      console.error('Error while reading the stream:', err);
      res.status(500).json({ error: 'Failed to retrieve file' });
    });

    readStream.pipe(res);
  } catch (error) {
    console.error('Error retrieving file:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
