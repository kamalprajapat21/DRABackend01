
// //practice code
// import createLab from '../../models/BOOKING/Lab.js'; // Adjust the path based on your project structure

// export const getPendingbyID = async (req, res) => {
//   try {
//     const Lab = createLab(req.conn2);

//     const { labId } = req.params; // Get the booking ID from the request parameters
//     // console.log('Fetching booking with ID:', id);

//     // Find the lab that contains the booking with the given ID
//     const lab = await Lab.findOne({ 'bookings.labId': labId });

//     // console.log(lab)

//     if (!lab) {
//       return res.status(404).json({ message: 'Booking not found' });
//     }

//     // Find the booking by ID from the lab's bookings array
//     // const booking = lab.bookings.id(id);
//     const booking = lab.bookings.find(b => b.labId === labId);


//     if (!booking) {
//       return res.status(404).json({ message: 'Booking not found in the lab' });
//     }

//     // Return the booking details
//     res.status(200).json({ booking });
//   } catch (error) {
//     console.error('Error fetching booking by ID:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to retrieve the booking',
//       error: error.message,
//     });
//   }
// };






//practice code
import createLab from '../../models/BOOKING/VaccinationModel.js'; // Adjust the path based on your project structure

export const getPendingbyID = async (req, res) => {
  try {
    const Lab = createLab(req.conn2);

    const { draId } = req.params; // Get the booking ID from the request parameters
    // console.log('Fetching booking with ID:', id);

    // Find the lab that contains the booking with the given ID
    const lab = await Lab.findOne({ 'bookings.draId': draId });

    // console.log(lab)

    if (!lab) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Find the booking by ID from the lab's bookings array
    // const booking = lab.bookings.id(id);
    const booking = lab.bookings.find(b => b.draId === draId);


    if (!booking) {
      return res.status(404).json({ message: 'Booking not found in the lab' });
    }

    // Return the booking details
    res.status(200).json({ booking });
  } catch (error) {
    console.error('Error fetching booking by ID:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve the booking',
      error: error.message,
    });
  }
};
