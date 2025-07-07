// import createUserModel from '../models/User.js';

// export const checkuserexistance = async (req, res) => {
//   try {
//     const User = createUserModel(req.conn1);
//     const { phoneNumber } = req.body;
//     console.log('Received request to send OTP to:', phoneNumber);

//     const existingUser = await User.findOne({ mobile: phoneNumber});
//     if (existingUser) {
//       console.log('User already exists:', existingUser);
//       return res.status(409).json({ message: 'User already exists. Please login.' });
//     }
//     const user = await User.findOneAndUpdate(
//       { mobile: phoneNumber },
//       { upsert: true, new: true }
//     );
//     console.log('User updated:', user);

//   } catch (err) {
//     console.error('Error during OTP generation:', err);
//     res.status(500).json({ msg: 'Error during OTP generation', error: err.message });
//   }
// };

import createUserModel from '../models/User.js';

export const checkuserexistance = async (req, res) => {
  try {
    const User = createUserModel(req.conn1);
    const { phoneNumber } = req.body;
    console.log('Received request to send OTP to:', phoneNumber);

    // Check if the user already exists
    const existingUser = await User.findOne({ mobile: phoneNumber });
    console.log(existingUser);
    if (existingUser) {
      console.log('User already exists:', existingUser);
      return res.status(409).json({ message: 'User already exists. Please login.' });
    }

    // If user does not exist, create a new one
    const user = await User.create({ mobile: phoneNumber });
    console.log('New user created:', user);
    
    return res.status(201).json({ message: 'User created successfully', user });
  } catch (err) {
    console.error('Error during user creation:', err);
    res.status(500).json({ msg: 'Error during user creation', error: err.message });
  }
};
