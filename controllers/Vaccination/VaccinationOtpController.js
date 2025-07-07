import createUrgentCaseModel from '../../models/BOOKING/VaccinationModel.js';
import crypto from 'crypto';

export const sendOtp = async (req, res) => {
  const { bookingId } = req.params;
  const VaccinationModel = createUrgentCaseModel(req.conn1); // DRA

  try {
    const otp = crypto.randomInt(1000, 9999).toString();

    const result = await VaccinationModel.updateOne(
      { 'bookings.bookingId': bookingId },
      {
        $set: {
          'bookings.$[elem].bookingOtp': otp,
        },
      },
      {
        arrayFilters: [{ 'elem.bookingId': bookingId }],
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const updatedDoc = await VaccinationModel.findOne({ 'bookings.bookingId': bookingId });
    const updatedBooking = updatedDoc.bookings.find(b => b.bookingId === bookingId);

    console.log('✅ Saved OTP:', updatedBooking.bookingOtp);

    res.status(200).json({ message: 'OTP sent successfully', otp });
  } catch (error) {
    console.error('❌ Error sending OTP:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};





export const verifyOtp = async (req, res) => {
  const { bookingId, type } = req.params; // 🔁 Get type = 'start' or 'end'
  const { otp } = req.body;

  const VaccinationModel = createUrgentCaseModel(req.conn1); // DRA
  const PWAVaccinationModel = createUrgentCaseModel(req.conn2); // PWA

  try {
    const draDoc = await VaccinationModel.findOne({ 'bookings.bookingId': bookingId });
    if (!draDoc) return res.status(404).json({ message: "Booking not found in DRA" });

    const draBooking = draDoc.bookings.find(b => b.bookingId === bookingId);
    if (!draBooking) return res.status(404).json({ message: "Booking not found in array" });

    const savedOtp = draBooking.bookingOtp;
    if (String(savedOtp) !== String(otp)) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (type === 'start') {
      draBooking.serviceStartTime = new Date();
      draBooking.status = 'pending';
    } else if (type === 'end') {
      draBooking.serviceEndTime = new Date();
      draBooking.status = 'completed';

      // ✅ Calculate timer
      const start = new Date(draBooking.serviceStartTime);
      const end = new Date(draBooking.serviceEndTime);
      const totalSeconds = Math.floor((end - start) / 1000);

      draBooking.timerData = {
        hours: Math.floor(totalSeconds / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60,
      };
    }

    await draDoc.save();

    // Update PWA
    const updateFields = {
      'bookings.$.status': draBooking.status,
    };
    if (type === 'end') {
      updateFields['bookings.$.serviceEndTime'] = draBooking.serviceEndTime;
      updateFields['bookings.$.timerData'] = draBooking.timerData;
    } else {
      updateFields['bookings.$.serviceStartTime'] = draBooking.serviceStartTime;
    }

    await PWAVaccinationModel.updateOne(
      { 'bookings.bookingId': bookingId },
      { $set: updateFields }
    );

    return res.status(200).json({ message: `OTP verified and ${type} updated successfully.` });
  } catch (error) {
    console.error('❌ OTP verification error:', error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};






export const getTimerData = async (req, res) => {
  const { bookingId } = req.params;
  const DRAUrgentCase = createUrgentCaseModel(req.conn1); // DRA DB

  try {
    const doc = await DRAUrgentCase.findOne({ 'bookings.bookingId': bookingId });
    if (!doc) return res.status(404).json({ message: 'Booking not found in DRA database.' });

    const booking = doc.bookings.find(b => b.bookingId === bookingId);
    if (!booking) return res.status(404).json({ message: 'Booking not found in bookings array.' });

    const { serviceStartTime, serviceEndTime, timerData = {} } = booking;

    // Calculate duration if both timestamps exist
    let calculatedTimer = {
      hours: timerData.hours || 0,
      minutes: timerData.minutes || 0,
      seconds: timerData.seconds || 0,
    };

    if (serviceStartTime && serviceEndTime) {
      const start = new Date(serviceStartTime);
      const end = new Date(serviceEndTime);
      const durationMs = end - start;

      const totalSeconds = Math.floor(durationMs / 1000);
      calculatedTimer = {
        hours: Math.floor(totalSeconds / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60,
      };
    }

    return res.status(200).json({
      bookingId: booking.bookingId,
      status: booking.status,
      serviceStartTime: serviceStartTime ? new Date(serviceStartTime).toISOString() : null,
      serviceEndTime: serviceEndTime ? new Date(serviceEndTime).toISOString() : null,
      timerData: calculatedTimer,
    });
  } catch (error) {
    console.error('Timer fetch error:', error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

