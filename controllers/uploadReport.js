// // working with file upload problem with id reference  function
// import multer from 'multer';
// import mongoose from 'mongoose';
// import Grid from 'gridfs-stream';
// import { GridFsStorage } from 'multer-gridfs-storage';
// import dotenv from 'dotenv';
// import createLab from '../models/BOOKING/Lab.js'; // Assuming Document is the model

// dotenv.config();

// const conn = mongoose.connection;
// let gfs;
// conn.once('open', () => {
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection('uploads');
// });

// const storage = new GridFsStorage({
//   url: process.env.MONGO_URI2,
//   file: (req, file) => {
//     return {
//       filename: Date.now() + '-' + file.originalname,
//       bucketName: 'uploads'
//     };
//   }
// });

// const upload = multer({ storage }).array('uploadreport', 10);

// export const uploadReport = (req, res) => {
//   const LabModel = createLab(req.conn1);
//   const { labId } = req.params;  
  
//   upload(req, res, async (err) => {
//     if (err) {
//       return res.status(400).send({ error: err.message });
//     }

//     if (!req.files || req.files.length === 0) {
//       return res.status(400).send({ error: 'No files were uploaded.' });
//     }

//     try {
//       // Find and update the booking with the given labId and pending status
//       const lab = await LabModel.findOneAndUpdate(
//         { "bookings.labId": labId, "bookings.status": "completed" },
//         {
//           $push: { "bookings.$.labreportId": req.files.map(file => file.id) }  // Append file IDs to labreportId
//         },
//         {
//           new: true,  // Return the updated document
//         }
//       );

//       if (!lab) {
//         return res.status(404).json({ message: 'Booking not found.' });
//       }

//       // Respond with the updated lab document
//       res.status(201).json(lab);
//     } catch (error) {
//       res.status(500).send({ error: 'Failed to save document' });
//     }
//   });
// };


// //practice
// import multer from 'multer';
// import mongoose from 'mongoose';
// import Grid from 'gridfs-stream';
// import { GridFsStorage } from 'multer-gridfs-storage';
// import dotenv from 'dotenv';
// import createLab from '../models/BOOKING/Lab.js'; // Assuming Document is the model

// dotenv.config();

// const conn = mongoose.connection;
// let gfs;
// conn.once('open', () => {
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection('uploads');
// });

// const storage = new GridFsStorage({
//   url: process.env.MONGO_URI2,
//   file: (req, file) => {
//     return {
//       filename: Date.now() + '-' + file.originalname,
//       bucketName: 'uploads'
//     };
//   }
// });

// const upload = multer({ storage }).array('uploadreport', 10);

// export const uploadReport = (req, res) => {
//   const LabModel = createLab(req.conn1);
//   const { labId } = req.params;
//   console.log(labId)
  
//   upload(req, res, async (err) => {
//     if (err) {
//       return res.status(400).send({ error: err.message });
//     }
    
//     if (!req.files || req.files.length === 0) {
//       return res.status(400).send({ error: 'No files were uploaded.' });
//     }
//     console.log(req.files)

//     try {
//       // Update the booking by pushing the new report ID based on labId
//       const lab = await LabModel.findOneAndUpdate(
//         { "bookings.labId": labId }, // Find by labId
//         {
//           $push: { "bookings.$.labreportId": { $each: req.files.map(file => file.id) } } // Push all file IDs
//         },
//         {
//           new: true,  // Return the updated document
//         }
//       );

//       console.log(lab)
//       console.log(bookings.labId)

//       if (!lab) {
//         return res.status(404).json({ message: 'Booking not found.' });
//       }

//       // Respond with the updated lab document
//       res.status(201).json(lab);
//     } catch (error) {
//       res.status(500).send({ error: 'Failed to update document' });
//     }
//   });
// };

import multer from 'multer';
import mongoose from 'mongoose';
import Grid from 'gridfs-stream';
import { GridFsStorage } from 'multer-gridfs-storage';
import dotenv from 'dotenv';
import createLab from '../models/BOOKING/VaccinationModel.js'; // Assuming Lab model

dotenv.config();

// Initialize GridFS
const conn = mongoose.connection;
let gfs;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads'); // Set the collection where files will be stored
});

// Create storage engine for multer-gridfs-storage
const storage = new GridFsStorage({
  url: process.env.MONGO_URI2, // Ensure this is the correct DB URI
  file: (req, file) => {
    return {
      filename: `${Date.now()}-${file.originalname}`, // Customize filename as needed
      bucketName: 'uploads' // Files will be stored in the 'uploads' bucket
    };
  }
});

// Set up multer to handle single file upload
const upload = multer({ storage }).single('uploadreport'); // single file upload

export const uploadReport = async (req, res) => {
  const LabModel = createLab(req.conn2); // Use the correct db connection
  const { labId } = req.params; // Extract labId from URL params

  // Perform file upload
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: `Error during file upload: ${err.message}` });
    }

    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No file was uploaded.' });
    }

    console.log(`File uploaded: ${req.file.filename}`);
    console.log(`Updating booking with labId: ${labId}`);

    try {
      // Find and update the booking by labId, setting the uploaded file's GridFS ID
      const lab = await LabModel.findOneAndUpdate(
        { "bookings.labId": labId }, // Find the booking by labId
        {
          $set: { "bookings.$[elem].labreportId": req.file.id } // Set the labreportId with the file's ID
        },
        {
          new: true, // Return the updated document
          arrayFilters: [{ "elem.labId": labId }] // Apply array filter to update the correct booking
        }
      );

      // If no lab is found, return an error
      if (!lab) {
        return res.status(404).json({ message: 'Booking not found.' });
      }

      console.log('Updated lab:', lab);

      // Return the updated lab document with the newly added file ID
      res.status(201).json(lab);

    } catch (error) {
      console.error('Error updating booking with report:', error);
      res.status(500).json({ error: 'Failed to update document with report.' });
    }
  });
};
