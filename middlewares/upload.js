// // import multer from 'multer';
// // import { GridFsStorage } from 'multer-gridfs-storage';

// // const storage = new GridFsStorage({
// //   url: 'mongodb+srv://dooper:zaKnkcwomfgnzy0j@cluster0.baaa2xr.mongodb.net/dooper?retryWrites=true&w=majority',
// //   options: { useNewUrlParser: true, useUnifiedTopology: true },
// //   file: (req, file) => {
// //     return {
// //       filename: `${Date.now()}-${file.originalname}`,
// //       bucketName: 'uploads' // must match your collection name
// //     };
// //   }
// // });

// // const upload = multer({ storage });

// // export default upload;





// // import multer from 'multer';
// // import { GridFsStorage } from 'multer-gridfs-storage';
// // import dotenv from 'dotenv';

// // dotenv.config();

// // // GridFS Storage
// // const storage = new GridFsStorage({
// //   url: process.env.MONGO_URI_1,
// //   file: (req, file) => {
// //     const allowedTypes = ['application/pdf', 'image/png'];

// //     if (!allowedTypes.includes(file.mimetype)) {
// //       const error = new Error('Only PDF and PNG files are allowed');
// //       error.code = 'LIMIT_FILE_TYPE';
// //       return Promise.reject(error);
// //     }

// //     return {
// //       filename: `${Date.now()}-${file.originalname}`,
// //       bucketName: 'uploads'
// //     };
// //   }
// // });

// // // File Filter (redundant with above but safe)
// // const fileFilter = (req, file, cb) => {
// //   const allowedTypes = ['application/pdf', 'image/png'];
// //   if (allowedTypes.includes(file.mimetype)) {
// //     cb(null, true);
// //   } else {
// //     cb(new Error('Only PDF and PNG files are allowed'));
// //   }
// // };

// // // Limits
// // const limits = {
// //   fileSize: 10 * 1024 * 1024 // 10 MB
// // };

// // // Export middleware
// // export const upload = multer({
// //   storage,
// //   fileFilter,
// //   limits
// // });




// import multer from 'multer';
// import { GridFsStorage } from 'multer-gridfs-storage';
// import dotenv from 'dotenv';

// dotenv.config();

// const storage = new GridFsStorage({
//   url: process.env.MONGO_URI_1,
//   file: async (req, file) => {
//     const allowedTypes = ['application/pdf', 'image/png'];

//     if (!allowedTypes.includes(file.mimetype)) {
//       // Returning null makes multer skip storing this file
//       return null; // <-- Important: don't reject, just return null
//     }

//     return {
//       filename: `${Date.now()}-${file.originalname}`,
//       bucketName: 'uploads'
//     };
//   }
// });

// // Limits
// const limits = {
//   fileSize: 10 * 1024 * 1024 // 10MB
// };

// // File filter that throws proper error
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ['application/pdf', 'image/png'];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only PDF and PNG files are allowed'), false);
//   }
// };

// export const upload = multer({
//   storage,
//   fileFilter,
//   limits
// });



import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => ({
    folder: 'lab_uploads',
    resource_type: 'auto', // handles pdf, image, etc.
    public_id: file.fieldname + '-' + Date.now(),
  }),
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['application/pdf', 'image/png'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF and PNG files are allowed.'));
  }
};

export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB per file
  fileFilter,
});
