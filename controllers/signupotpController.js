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

// import createUserModel from '../models/User.js';

// export const checkuserexistance = async (req, res) => {
//   try {
//     const User = createUserModel(req.conn1);
//     const { phoneNumber } = req.body;
//     console.log('Received request to send OTP to:', phoneNumber);

//     // Check if the user already exists
//     const existingUser = await User.findOne({ mobile: phoneNumber });
//     console.log(existingUser);
//     if (existingUser) {
//       console.log('User already exists:', existingUser);
//       return res.status(409).json({ message: 'User already exists. Please login.' });
//     }

//     // If user does not exist, create a new one
//     const user = await User.create({ mobile: phoneNumber });
//     console.log('New user created:', user);
    
//     return res.status(201).json({ message: 'User created successfully', user });
//   } catch (err) {
//     console.error('Error during user creation:', err);
//     res.status(500).json({ msg: 'Error during user creation', error: err.message });
//   }
// };


import createUserModel from '../models/User.js';


export const checkuserexistance = async (req, res) => {
  try {
    const User = createUserModel(req.conn1);
    const { phoneNumber } = req.body;
    console.log('Checking user existence for:', phoneNumber);

    const existingUser = await User.findOne({ mobile: phoneNumber });
    
    if (existingUser) {
      console.log('User already exists:', existingUser);
      return res.status(200).json({ 
        success: false,
        message: "User already exists",
        userExists: true, 
        user: existingUser 
      });
    }

    console.log('User does not exist for phone:', phoneNumber);
    return res.status(404).json({ 
      success: true,
      message: "User not found - can proceed with signup",
      userExists: false, 
      user: null 
    });
    
  } catch (err) {
    console.error('Error during user existence check:', err);
    res.status(500).json({ 
      success: false,
      message: 'Error checking user existence', 
      error: err.message 
    });
  }
};




/////WithFirebae
export const createUserWithFirebaseToken = async (req, res) => {
  try {
    const User = createUserModel(req.conn1);
    const { token, phoneNumber, uid } = req.body;
    
    console.log('Creating user with Firebase token verification for:', phoneNumber);

    // 1. Verify Firebase token using Firebase Admin SDK
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      
      // 2. Verify token matches the request
      if (decodedToken.phone_number !== phoneNumber || decodedToken.uid !== uid) {
        return res.status(400).json({
          success: false,
          message: "Invalid token or phone number mismatch"
        });
      }
      
      console.log('Firebase token verified successfully for:', phoneNumber);
      
    } catch (tokenError) {
      console.error('Firebase token verification failed:', tokenError);
      return res.status(401).json({
        success: false,
        message: "Invalid Firebase token"
      });
    }

    // 3. Check if user already exists
    const existingUser = await User.findOne({ mobile: phoneNumber });
    if (existingUser) {
      console.log('User already exists during creation:', existingUser);
      return res.status(200).json({
        success: true,
        message: "User already exists",
        user: existingUser
      });
    }

    // 4. Create new user with verified token
    const newUser = await User.create({ 
      mobile: phoneNumber,
      firebaseUid: uid,
      isVerified: true, // Token is verified
      signupStatus: false,
      createdOn: new Date(),
      modifiedOn: new Date()
    });
    
    console.log('New user created with token verification:', newUser);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: newUser
    });
    
  } catch (err) {
    console.error('Error during user creation with token:', err);
    res.status(500).json({ 
      success: false,
      message: 'Error during user creation', 
      error: err.message 
    });
  }
};