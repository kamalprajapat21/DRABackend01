// // backend/controllers/AvailableController.js
// import createEarning from '../models/Earning.js';
// import createUser from '../models/User1.js';

// export const getAvailable = async (req, res) => {
//   const Earning = createEarning(req.conn1);
//   const User = createUser(req.conn1);
//   const { phoneNumber } = req.body; // Destructure phoneNumber from req.body

//   try {
//     // Find the user by phoneNumber
//     const user = await User.findOne({ mobile: phoneNumber });
//     if (!user) {
//       return res.status(404).send('User not found');
//     }

//     // Find the earnings for the user
//     const earning = await Earning.findOne({ userId: user._id });
//     if (!earning) {
//       return res.status(404).send('Earnings not found for user');
//     }

//     // Ensure availableBalance is set initially to totalEarnings
//     if (!earning.availableBalance) {
//       earning.availableBalance = earning.totalEarnings;
//       await earning.save();
//     }
    
//     // Destructure required fields from earnings
//     const { availableBalance, totalRedeemed } = earning;
//     // Send response with the available balance and total redeemed
//     res.json({
//       availableBalance,
//       totalRedeemed,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// };

import createEarning from '../models/Earning.js';

export const getAvailable = async (req, res) => {
  const Earning = createEarning(req.conn1);

  try {
    const {phoneNumber} = req.body;
    const labownermobile = phoneNumber

    console.log(`Fetching available balance for lab owner mobile: ${labownermobile}`);

    // Fetch the current earning document based on labownermobile
    const earning = await Earning.findOne({ labownermobile });

    if (!earning) {
      return res.status(404).json({ message: 'No earning record found for this lab owner.' });
    }

    

    // Return the available balance
    res.json({
      labownermobile,
      availableBalance: earning.availableBalance,
      totalRedeemed: earning.totalRedeemed
    });
  } catch (error) {
    console.log('Alert: Server error', error.message);
    res.status(500).send(error);
  }
};
