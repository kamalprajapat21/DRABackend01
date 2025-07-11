import createHomeCareModel from '../../models/BOOKING/Home.js';
import createUrgentCaseModel from '../../models/BOOKING/UrgentCaseModel.js';
import createPwaNursingModel from '../../models/BOOKING/NursingModel.js';
import createVaccinationModel from '../../models/BOOKING/VaccinationModel.js';
import createUser1Model from '../../models/BOOKING/User1.js';

export const getAllBookingsWithServiceType = async (req, res) => {
  try {
    const conn2 = req.conn2;
    const HomeCareModel = createHomeCareModel(conn2);
    const UrgentCaseModel = createUrgentCaseModel(conn2);
    const NursingModel = createPwaNursingModel(conn2);
    const VaccinationModel = createVaccinationModel(conn2);
    const User1 = createUser1Model(conn2);

    // Helper to get address from user
    const getAddress = async (userId, mobile) => {
      if (!userId && !mobile) return '';
      let user = null;
      if (userId) {
        user = await User1.findById(userId).lean();
      } else if (mobile) {
        user = await User1.findOne({ mobileNumber: mobile }).lean();
      }
      if (!user) return '';
      return [user.addressLine1, user.city, user.state].filter(Boolean).join(', ');
    };

    // Fetch and flatten bookings for each service
    const flattenBookings = async (docs, serviceType) => {
      const all = [];
      for (const doc of docs) {
        for (const booking of doc.bookings) {
          const address = await getAddress(doc.userId, booking.mobileNumber || doc.mobile);
          all.push({
            serviceType,
            patientName: booking.patientName,
            address,
            symptoms: booking.symptoms || booking.details || booking.patientsNote || '',
            status: booking.status,
          });
        }
      }
      return all;
    };

    // Fetch all bookings
    const [homeDocs, urgentDocs, nursingDocs, vaccDocs] = await Promise.all([
      HomeCareModel.find({}).lean(),
      UrgentCaseModel.find({}).lean(),
      NursingModel.find({}).lean(),
      VaccinationModel.find({}).lean(),
    ]);

    // Flatten and unify
    const [homeBookings, urgentBookings, nursingBookings, vaccBookings] = await Promise.all([
      flattenBookings(homeDocs, 'HomeCare'),
      flattenBookings(urgentDocs, 'UrgentCase'),
      flattenBookings(nursingDocs, 'Nursing'),
      flattenBookings(vaccDocs, 'Vaccination'),
    ]);

    const allBookings = [
      ...homeBookings,
      ...urgentBookings,
      ...nursingBookings,
      ...vaccBookings,
    ];

    res.json({ bookings: allBookings });
  } catch (error) {
    console.error('Error in getAllBookingsWithServiceType:', error);
    res.status(500).json({ error: 'Server error' });
  }
}; 