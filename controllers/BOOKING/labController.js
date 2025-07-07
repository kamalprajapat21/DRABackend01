       
// // working for all incoming bookings perfect
// import createLab from '../../models/BOOKING/Lab.js'; // Adjust the path based on your project structure
// export const getLab = async (req, res) => {
//   try {
//     const Lab = createLab(req.conn1);
   
//     // Log to ensure Lab is created
//     console.log('Lab model created successfully');

//     const labs = await Lab.find({}); // Retrieve all documents
//     console.log('Retrieved labs:', labs);

//     if (!labs.length) {
//       return res.status(404).json({ message: 'No Labs found in the database' });
//     }

//     // Flatten and filter bookings with status 'incoming'
//     const allBookings = labs.reduce((acc, lab) => {
//       const incomingBookings = lab.bookings.filter(booking => booking.status === 'incoming');
//       return acc.concat(incomingBookings || []);
//     }, []);

//     console.log('Incoming bookings:', allBookings); // Log filtered bookings

//     if (!allBookings.length) {
//       return res.status(404).json({ message: 'No incoming bookings found' });
//     }

//     res.status(200).json({ allBookings });
//   } catch (error) {
//     console.error('Error retrieving bookings:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to retrieve bookings',
//       error: error.message,
//     });
//   }
// };
       
// working for all incoming bookings perfect
import createLab from '../../models/BOOKING/VaccinationModel.js'; // Adjust the path based on your project structure
export const getLab = async (req, res) => {
  try {
    const Lab = createLab(req.conn2);
   
    // Log to ensure Lab is created
    console.log('Lab model created successfully');

    const labs = await Lab.find({}); // Retrieve all documents
    console.log('Retrieved labs:', labs);

    if (!labs.length) {
      return res.status(404).json({ message: 'No Labs found in the database' });
    }

    // Flatten and filter bookings with status 'incoming'
    const allBookings = labs.reduce((acc, lab) => {
      const incomingBookings = lab.bookings.filter(booking => booking.status === 'incoming');
      return acc.concat(incomingBookings || []);
    }, []);

    console.log('Incoming bookings:', allBookings); // Log filtered bookings

    if (!allBookings.length) {
      return res.status(404).json({ message: 'No incoming bookings found' });
    }

    res.status(200).json({ allBookings });
  } catch (error) {
    console.error('Error retrieving bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve bookings',
      error: error.message,
    });
  }
};
