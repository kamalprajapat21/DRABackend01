           
// import createLab from '../../models/BOOKING/Lab.js'; // Adjust the path based on your project structure
// export const getPending = async (req, res) => {
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
        //       const incomingBookings = lab.bookings.filter(booking => booking.status === 'pending');
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
              
              
              // export const getCancelled = async (req, res) => {
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
                      //       const incomingBookings = lab.bookings.filter(booking => booking.status === 'cancelled');
                      //       return acc.concat(incomingBookings || []);
                      //     }, []);
                      
                      //     console.log('Incoming bookings:', allBookings); // Log filtered bookings
                      
                      //     if (!allBookings.length) {
                        //       return res.status(404).json({ message: 'No cancelled bookings found' });
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
                            
                            // export const getCompleted = async (req, res) => {
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
                                    //       const incomingBookings = lab.bookings.filter(booking => booking.status === 'completed');
                                    //       return acc.concat(incomingBookings || []);
                                    //     }, []);
                                    
                                    //     console.log('Incoming bookings:', allBookings); // Log filtered bookings
                                    
                                    //     if (!allBookings.length) {
                                      //       return res.status(404).json({ message: 'No completed bookings found' });
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
                                          
                                          //for showing the pending bookings 
                                          
                                          // import createLab from '../../models/BOOKING/Lab.js'; // Adjust the path based on your project structure
                                          // export const getPending = async (req, res) => {
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
    //       const incomingBookings = lab.bookings.filter(booking => booking.status === 'pending');
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
          
          
// import createLab from '../../models/BOOKING/Lab.js'; // Adjust the path based on your project structure
// export const getPending = async (req, res) => {
//   try {
//     const { labownermobile } = req.body; // Extract labownermobile from the request body

//     console.log(`Fetching pending bookings for lab owner mobile: ${labownermobile}`);

//     const LabModel = createLab(req.conn1);

//     // Find bookings where labownermobile matches and status is pending
//     const bookings = await LabModel.find(
//       { "bookings.labownermobile": labownermobile, "bookings.status": "pending" },
//       { "bookings.$": 1 } // Projection to return only the bookings array
//     );

//     if (!bookings || bookings.length === 0) {
//       return res.status(404).json({ message: 'No pending bookings found for this lab owner.' });
//     }

//     // Return the found bookings
//     res.status(200).json({
//       message: 'Pending bookings retrieved successfully',
//       bookings,
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching pending bookings', error: error.message });
//   }
// };

import createLab from '../../models/BOOKING/VaccinationModel.js'; // Adjust the path based on your project structure

export const getPending = async (req, res) => {
  try {
    const { labownermobile } = req.body; // Extract labownermobile from the request body

    console.log(`Fetching pending bookings for lab owner mobile: ${labownermobile}`);

    const LabModel = createLab(req.conn2);

    // Find bookings where labownermobile matches and status is pending
    const labs = await LabModel.find({}); // Retrieve all labs

    // Filter and flatten the pending bookings
    const pendingBookings = labs.reduce((acc, lab) => {
      const labPendingBookings = lab.bookings.filter(booking => 
        booking.labownermobile === labownermobile && booking.status === 'pending'
      );
      return acc.concat(labPendingBookings || []);
    }, []);

    if (!pendingBookings.length) {
      return res.status(404).json({ message: 'No pending bookings found for this lab owner.' });
    }

    // Return the found bookings in a similar format
    res.status(200).json({
      message: 'Pending bookings retrieved successfully',
      allBookings: pendingBookings, // Using the same key as in getLab
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pending bookings', error: error.message });
  }
};



export const getCancelled = async (req, res) => {
  try {
    const { labownermobile } = req.body; // Extract labownermobile from the request body

    console.log(`Fetching pending bookings for lab owner mobile: ${labownermobile}`);

    const LabModel = createLab(req.conn2);

    // Find bookings where labownermobile matches and status is pending
    const labs = await LabModel.find({}); // Retrieve all labs

    // Filter and flatten the pending bookings
    const pendingBookings = labs.reduce((acc, lab) => {
      const labPendingBookings = lab.bookings.filter(booking => 
        booking.labownermobile === labownermobile && booking.status === 'cancelled'
      );
      return acc.concat(labPendingBookings || []);
    }, []);

    if (!pendingBookings.length) {
      return res.status(404).json({ message: 'No pending cancelled found for this lab owner.' });
    }

    // Return the found bookings in a similar format
    res.status(200).json({
      message: 'Pending bookings retrieved successfully',
      allBookings: pendingBookings, // Using the same key as in getLab
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pending bookings', error: error.message });
  }
};

export const getCompleted = async (req, res) => {
  try {
    const { labownermobile } = req.body; // Extract labownermobile from the request body

    console.log(`Fetching pending bookings for lab owner mobile: ${labownermobile}`);

    const LabModel = createLab(req.conn2);

    // Find bookings where labownermobile matches and status is pending
    const labs = await LabModel.find({}); // Retrieve all labs

    // Filter and flatten the pending bookings
    const pendingBookings = labs.reduce((acc, lab) => {
      const labPendingBookings = lab.bookings.filter(booking => 
        booking.labownermobile === labownermobile && booking.status === 'completed'
      );
      return acc.concat(labPendingBookings || []);
    }, []);

    if (!pendingBookings.length) {
      return res.status(404).json({ message: 'No completed bookings found for this lab owner.' });
    }

    // Return the found bookings in a similar format
    res.status(200).json({
      message: 'Pending bookings retrieved successfully',
      allBookings: pendingBookings, // Using the same key as in getLab
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pending bookings', error: error.message });
  }
};