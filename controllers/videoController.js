import { getDraUrgentModel } from '../models/DraUrgentBooking.js';

export const getDraVideo = async (req, res) => {
  try {
    const { id } = req.params; // This can be _id or bookingId
    const DraUrgent = getDraUrgentModel(req.conn1); // Make sure req.conn1 is available

const booking = await DraUrgent.findOne({ bookingId: id });
    if (!booking) return res.status(404).json({ message: 'Booking not found in DRA DB' });

    res.json({
      videoNote: booking.videoNote,
      videoFileId: booking.videoFileId,
    });
  } catch (error) {
    console.error('Error fetching video:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
