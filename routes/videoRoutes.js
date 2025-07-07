// // routes/videoRoutes.js
// import express from 'express';
// const router = express.Router();

// router.get('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const DraUrgent = req.conn1.model('DraUrgent');

//     const booking = await DraUrgent.findById(id);
//     if (!booking || !booking.videoNote) {
//       return res.status(404).json({ message: 'Video not found for this booking' });
//     }

//     // Assuming video files are stored in a public/videos directory
//     const filePath = `./public/videos/${booking.videoNote}`;
//     res.sendFile(filePath, { root: '.' });
//   } catch (err) {
//     console.error('Error fetching video:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// export default router;



import express from 'express';
import { getDraVideo } from '../controllers/videoController.js';

const router = express.Router();

router.use((req, res, next) => {
  import('../config/db.js').then(({ default: connectDB }) =>
    connectDB().then(({ conn1, conn2 }) => {
      req.conn1 = conn1;
      req.conn2 = conn2;
      next();
    }).catch(next)
  );
});

router.get('/dra/:id', getDraVideo);

export default router;
