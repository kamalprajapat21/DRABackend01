import createUser from '../models/User.js';

export const checkuserexistance2 = async (req, res) => {
  const User = createUser(req.conn1);
  // const UserBookings = createUserBookings(req.conn1);
  // const Earning = createEarning(req.conn1);
  try {
    // const User = createUserModel(req.conn1);
    const { phoneNumber } = req.body;
    console.log('Received login request for:', phoneNumber);

    // Check if the user exists
    const existingUser = await User.findOne({ mobile: phoneNumber });
    if (!existingUser) {
      console.log('User does not exist:', phoneNumber);
      return res.status(404).json({ message: 'User not found. Please sign up.' });
    }

    // Handle successful login (e.g., generate a session or token)
    console.log('User logged in successfully:', existingUser);
    return res.status(200).json({ message: 'Login successful', user: existingUser });

  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ msg: 'Error during login', error: err.message });
  }
};
