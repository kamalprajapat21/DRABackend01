// controllers/serviceTimerController.js
export const getServiceDuration = async (req, res) => {
  try {
    const { mobile } = req.params;
    const conn = req.conn2;
    const Otp = (await import('../models/Otp.js')).default(conn);

    const record = await Otp.findOne({ phoneNumber: mobile });

    if (!record || !record.startServiceAt) {
      return res.status(404).json({ message: 'Service not started' });
    }

    const now = new Date();
    const start = new Date(record.startServiceAt);
    const diffMs = now - start;

    const hours = Math.floor(diffMs / 3600000).toString().padStart(2, '0');
    const minutes = Math.floor((diffMs % 3600000) / 60000).toString().padStart(2, '0');
    const seconds = Math.floor((diffMs % 60000) / 1000).toString().padStart(2, '0');

    const formattedDuration = `${hours}:${minutes}:${seconds}`;

    res.status(200).json({ duration: formattedDuration });
  } catch (err) {
    console.error('Error fetching duration:', err);
    res.status(500).json({ message: 'Failed to get service timer' });
  }
};
