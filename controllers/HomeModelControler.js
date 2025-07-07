import createHomeModel from '../models/homeCare.js';

export const sendHomeOtp = async (req, res) => {
  const Home = createHomeModel(req.conn2);
  const { bookingId } = req.params;
  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  const updated = await Home.findOneAndUpdate(
    { 'bookings.bookingId': bookingId },
    { $set: { 'bookings.$.bookingOtp': otp } },
    { new: true }
  );

  if (!updated) return res.status(404).json({ message: 'Booking not found' });
  res.status(200).json({ message: 'OTP sent successfully', otp });
};
