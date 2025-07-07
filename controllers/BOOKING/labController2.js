// import express from 'express';
// import createLab from '../../models/BOOKING/Lab.js';

// export const acceptLab = async (req, res) => {
//   try {
//     const LabModel = createLab(req.conn1);
//     const { labacceptedByid } = req.body;

//     // Use arrayFilters to target the specific booking
//     const lab = await LabModel.findOneAndUpdate(
//       { "bookings.labacceptedByid": labacceptedByid, "bookings.status": "incoming" },
//       { $set: { "bookings.$[elem].status": "pending" } },
//       {
//         new: true, // Return the updated document
//         arrayFilters: [{ "elem.labacceptedByid": labacceptedByid }]
//       }
//     );

//     if (!lab) {
//       return res.status(404).json({ message: 'Booking not found or already updated.' });
//     }

//     // Return the updated lab document
//     res.status(200).json({
//       message: 'Booking status updated successfully to pending',
//       lab,
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating booking status', error: error.message });
//   }
// };


// export const rejectLab = async (req, res) => {
//   // export const acceptLab = async (req, res) => {
//     try {
//       const LabModel = createLab(req.conn1);
//       const { labacceptedByid } = req.body;
  
//       // Use arrayFilters to target the specific booking
//       const lab = await LabModel.findOneAndUpdate(
//         { "bookings.labacceptedByid": labacceptedByid, "bookings.status": "incoming" },
//         { $set: { "bookings.$[elem].status": "cancelled" } },
//         {
//           new: true, // Return the updated document
//           arrayFilters: [{ "elem.labacceptedByid": labacceptedByid }]
//         }
//       );
  
//       if (!lab) {
//         return res.status(404).json({ message: 'Incoming booking not found.' });
//       }
  
//       // Return the updated lab document
//       res.status(200).json({
//         message: 'Booking status updated successfully to cancelled',
//         lab,
//       });
//     } catch (error) {
//       res.status(500).json({ message: 'Error updating booking status', error: error.message });
//     }
//   };
  
// export const completeLab = async (req, res) => {
//   // export const acceptLab = async (req, res) => {
//     try {
//       const LabModel = createLab(req.conn1);
//       const { labId } = req.params;
         
//       // Use arrayFilters to target the specific booking
//       const lab = await LabModel.findOneAndUpdate(
//         { "bookings.labId": labId, "bookings.status": "pending" },
//         { $set: { "bookings.$[elem].status": "completed" } },
//         {
//           new: true, // Return the updated document
//           arrayFilters: [{ "elem.labId": labId }]
//         }
//       );
  
//       if (!lab) {
//         return res.status(404).json({ message: 'pending booking not found.' });
//       }
  
//       // Return the updated lab document
//       res.status(200).json({
//         message: 'Booking status updated successfully to cancelled',
//         lab,
//       });
//     } catch (error) {
//       res.status(500).json({ message: 'Error updating booking status', error: error.message });
//     }
//   };


//updating code so that pending bookings are unique for particular lab owner


  
// import express from 'express';
// import createLab from '../../models/BOOKING/Lab.js';
// import createUser1 from '../../models/User1.js';



// export const acceptLab = async (req, res) => {
//   try {
//     const LabModel = createLab(req.conn2);
//     const { labId } = req.body;
//     const { labownermobile } = req.body;

//     console.log(`Searching for booking with labId: ${labId}`);

//     const lab = await LabModel.findOneAndUpdate(
//       { "bookings.labId": labId, "bookings.status": "incoming" },
//       { 
//         $set: { 
//           "bookings.$[elem].status": "pending",
//           "bookings.$[elem].labownermobile": labownermobile 
//         }
//       },
//       {
//         new: true,
//         arrayFilters: [{ "elem.labId": labId }]
//       }
//     );

//     console.log('Found lab:', lab);

//     if (!lab) {
//       return res.status(404).json({ message: 'Incoming booking not found.' });
//     }

//     res.status(200).json({
//       message: 'Booking status updated successfully to completed',
//       lab,
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating booking status', error: error.message });
//   }
// };


// export const rejectLab = async (req, res) => {
//   try {
//     const LabModel = createLab(req.conn2);
//     const { labId } = req.body; // Make sure you're getting labId from body
//     const { labownermobile } = req.body;

//     console.log(`Searching for booking with labId: ${labId}`);

//     // Use arrayFilters to target the specific booking
//     const lab = await LabModel.findOneAndUpdate(
//       { "bookings.labId": labId, "bookings.status": "incoming" },
//       { 
//         $set: { 
//           "bookings.$[elem].status": "cancelled",
//           "bookings.$[elem].labownermobile": labownermobile // Update labownermobile field
//         }
//       },
//       {
//         new: true, // Return the updated document
//         arrayFilters: [{ "elem.labId": labId }]
//       }
//     );

//     console.log('Found lab:', lab); // Log the found lab object

//     if (!lab) {
//       return res.status(404).json({ message: 'Incoming booking not found.' });
//     }

//     // Return the updated lab document
//     res.status(200).json({
//       message: 'Booking status updated successfully to completed',
//       lab,
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating booking status', error: error.message });
//   }
//   };
  
// export const completeLab = async (req, res) => {
//   try {
//     const LabModel = createLab(req.conn2);
//     const { labId } = req.params; // Make sure you're getting labId from body
//     const { labownermobile } = req.body;

//     console.log(`Searching for booking with labId: ${labId}`);

//     // Use arrayFilters to target the specific booking
//     const lab = await LabModel.findOneAndUpdate(
//       { "bookings.labId": labId, "bookings.status": "pending", "bookings.labownermobile":labownermobile },
//       { 
//         $set: { 
//           "bookings.$[elem].status": "completed",
//           // "bookings.$[elem].labownermobile": labownermobile // Update labownermobile field
//         }
//       },
//       {
//         new: true, // Return the updated document
//         arrayFilters: [{ "elem.labId": labId }]
//       }
//     );

//     console.log('Found lab:', lab); // Log the found lab object

//     if (!lab) {
//       return res.status(404).json({ message: 'pending booking not found.' });
//     }

//     // Return the updated lab document
//     res.status(200).json({
//       message: 'Booking status updated successfully to completed',
//       lab,
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating booking status', error: error.message });
//   }
//   };
  


import express from 'express';
import createLab from '../../models/BOOKING/VaccinationModel.js';
import createUser1 from '../../models/User1.js';



export const acceptLab = async (req, res) => {
  try {
    const LabModel = createLab(req.conn2);
    const { labId } = req.body;
    const { labownermobile } = req.body;

    console.log(`Searching for booking with labId: ${labId}`);

    const lab = await LabModel.findOneAndUpdate(
      { "bookings.labId": labId, "bookings.status": "incoming" },
      { 
        $set: { 
          "bookings.$[elem].status": "pending",
          "bookings.$[elem].labownermobile": labownermobile 
        }
      },
      {
        new: true,
        arrayFilters: [{ "elem.labId": labId }]
      }
    );

    console.log('Found lab:', lab);

    if (!lab) {
      return res.status(404).json({ message: 'Incoming booking not found.' });
    }

    res.status(200).json({
      message: 'Booking status updated successfully to completed',
      lab,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating booking status', error: error.message });
  }
};


export const rejectLab = async (req, res) => {
  try {
    const LabModel = createLab(req.conn2);
    const { labId } = req.body; // Make sure you're getting labId from body
    const { labownermobile } = req.body;

    console.log(`Searching for booking with labId: ${labId}`);

    // Use arrayFilters to target the specific booking
    const lab = await LabModel.findOneAndUpdate(
      { "bookings.labId": labId, "bookings.status": "incoming" },
      { 
        $set: { 
          "bookings.$[elem].status": "cancelled",
          "bookings.$[elem].labownermobile": labownermobile // Update labownermobile field
        }
      },
      {
        new: true, // Return the updated document
        arrayFilters: [{ "elem.labId": labId }]
      }
    );

    console.log('Found lab:', lab); // Log the found lab object

    if (!lab) {
      return res.status(404).json({ message: 'Incoming booking not found.' });
    }

    // Return the updated lab document
    res.status(200).json({
      message: 'Booking status updated successfully to completed',
      lab,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating booking status', error: error.message });
  }
  };
  
export const completeLab = async (req, res) => {
  try {
    const LabModel = createLab(req.conn2);
    const { draId } = req.params; // Make sure you're getting labId from body
    const { labownermobile } = req.body;

    console.log(`Searching for booking with draId: ${draId}`);

    // Use arrayFilters to target the specific booking
    const lab = await LabModel.findOneAndUpdate(
      { "bookings.draId": draId, "bookings.status": "pending", "bookings.labownermobile": labownermobile },
      { 
        $set: { 
          "bookings.$[elem].status": "completed",
          // "bookings.$[elem].labownermobile": labownermobile // Update labownermobile field
        }
      },
      {
        new: true, // Return the updated document
        arrayFilters: [{ "elem.draId": draId }]
      }
    );

    console.log('Found lab:', lab); // Log the found lab object

    if (!lab) {
      return res.status(404).json({ message: 'pending booking not found.' });
    }

    // Return the updated lab document
    res.status(200).json({
      message: 'Booking status updated successfully to completed',
      lab,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating booking status', error: error.message });
  }
  };
  
