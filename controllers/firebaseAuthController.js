// backend/controllers/firebaseAuthController.js
import admin from '../config/firebaseAdmin.js';
import createUserModel from '../models/User.js';

// export const firebaseTokenAuth = async (req, res) => {
//   try {
//     const { token, phoneNumber, uid } = req.body;
//     if (!token || !phoneNumber || !uid) {
//       return res.status(400).json({ success: false, message: 'Missing parameters' });
//     }

//     // Verify Firebase token
//     const decoded = await admin.auth().verifyIdToken(token);

//     // Security check: uid and phone number must match
//     if (decoded.uid !== uid || decoded.phone_number !== phoneNumber) {
//       return res.status(401).json({ success: false, message: 'Token/user info mismatch' });
//     }

//     // DB logic: check if user exists by mobile (phoneNumber)
//     const User = createUserModel(req.conn1);
//     let user = await User.findOne({ mobile: phoneNumber });
//     if (!user) {
//       // Create new user if not exists
//       user = await User.create({ mobile: phoneNumber });
//     }

//     // Respond with user info (no sensitive data)
//     return res.json({
//       success: true,
//       message: 'Firebase token verified, user signed in',
//       data: {
//         user: {
//           id: user._id,
//           phoneNumber: user.mobile,
//         },
//       },
//     });
//   } catch (err) {
//     console.error('Token verification failed:', err);
//     return res.status(401).json({ success: false, message: 'Invalid or expired token' });
//   }
// }; 



// export const firebaseTokenAuth = async (req, res) => {
//   try {
//     const { token, phoneNumber, uid } = req.body;
//     if (!token || !phoneNumber || !uid) {
//       return res.status(400).json({ success: false, message: 'Missing parameters' });
//     }

//     // ✅ Step 1: Verify token from Firebase
//     const decoded = await admin.auth().verifyIdToken(token);

//     if (decoded.uid !== uid || decoded.phone_number !== phoneNumber) {
//       return res.status(401).json({ success: false, message: 'Token/user info mismatch' });
//     }

//     // ✅ Step 2: Check if user exists
//     const User = createUserModel(req.conn1);
//     const user = await User.findOne({ mobile: phoneNumber });

//     // ✅ Step 3: Respond with user status
//     return res.json({
//       success: true,
//       message: 'Firebase token verified',
//       data: {
//         userStatus: user ? 'existing_user' : 'new_user',
//         phoneNumber,
//       },
//     });
//   } catch (err) {
//     console.error('Token verification failed:', err);
//     return res.status(401).json({ success: false, message: 'Invalid or expired token' });
//   }
// };

// export const firebaseTokenAuth = async (req, res) => {
//   try {
//     console.log('Received body:', req.body); // ✅ Add this

//     const { token, phoneNumber, uid } = req.body;
//     if (!token || !phoneNumber || !uid) {
//       return res.status(400).json({ success: false, message: 'Missing parameters' });
//     }

//     const decoded = await admin.auth().verifyIdToken(token);

//     if (decoded.uid !== uid || decoded.phone_number !== phoneNumber) {
//       return res.status(401).json({ success: false, message: 'Token/user info mismatch' });
//     }

//     const User = createUserModel(req.conn1);
//     const user = await User.findOne({ mobile: phoneNumber });

//     return res.json({
//       success: true,
//       message: 'Firebase token verified',
//       data: {
//         userStatus: user ? 'existing_user' : 'new_user',
//         phoneNumber,
//       },
//     });
//   } catch (err) {
//     console.error('Token verification failed:', err);
//     return res.status(401).json({ success: false, message: 'Invalid or expired token' });
//   }
// };

// import admin from 'firebase-admin';
// import createUserModel from '../models/User.js';

// export const firebaseTokenAuth = async (req, res) => {
//   try {
//     console.log('📥 Received body:', req.body);

//     const { token, phoneNumber, uid } = req.body;

//     // Validate required fields
//     if (!token || !phoneNumber || !uid) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Missing token, phoneNumber, or uid' 
//       });
//     }

//     // Verify Firebase token
//     const decoded = await admin.auth().verifyIdToken(token);

//     if (decoded.uid !== uid || decoded.phone_number !== phoneNumber) {
//       return res.status(401).json({ 
//         success: false, 
//         message: 'Token and user info mismatch' 
//       });
//     }

//     console.log('✅ Firebase token verified for:', phoneNumber);

//     const User = createUserModel(req.conn1);
//     let user = await User.findOne({ mobile: phoneNumber });

//     // ✅ Case 1: Create new user if not exists
//     if (!user) {
//       user = await User.create({
//         mobile: phoneNumber,
//         firebaseUid: uid,
//         isVerified: true,
//         signupStatus: false, // not complete yet
//         createdOn: new Date(),
//         modifiedOn: new Date(),
//       });

//       console.log('🆕 New user created after token verification:', user);
//     } else {
//       console.log('👤 Existing user found:', user);
//     }

//     // ✅ Allow front-end to continue signup (if not completed)
//     const canContinueSignup = user.signupStatus === false;

//     return res.status(200).json({
//       success: true,
//       message: 'Firebase token verified and user ready',
//       data: {
//         phoneNumber,
//         userStatus: user.signupStatus ? 'completed' : 'incomplete',
//         userExists: true,
//         canContinueSignup,
//         userId: user._id
//       }
//     });

//   } catch (err) {
//     console.error('❌ Token verification or DB error:', err);
//     return res.status(401).json({ 
//       success: false, 
//       message: 'Invalid or expired token', 
//       error: err.message 
//     });
//   }
// };


// export const firebaseTokenAuth = async (req, res) => {
//   try {
//     console.log('Received body:', req.body);

//     const { token, phoneNumber, uid } = req.body;
//     if (!token || !phoneNumber || !uid) {
//       return res.status(400).json({ success: false, message: 'Missing parameters' });
//     }

//     // 1. Verify token
//     const decoded = await admin.auth().verifyIdToken(token);

//     if (decoded.uid !== uid || decoded.phone_number !== phoneNumber) {
//       return res.status(401).json({ success: false, message: 'Token/user info mismatch' });
//     }

//     const User = createUserModel(req.conn1);

//     // 2. Check if user exists
//     let user = await User.findOne({ mobile: phoneNumber });

//     // 3. If user doesn't exist, create a new one (temporary record)
//     if (!user) {
//       user = await User.create({
//         mobile: phoneNumber,
//         uid: uid, // optional
//         isSignupCompleted: false, // Add a flag to track completion
//         createdAt: new Date(),
//       });
//     }

//     return res.json({
//       success: true,
//       message: 'Firebase token verified',
//       data: {
//         userStatus: user.isSignupCompleted ? 'existing_user' : 'incomplete_signup',
//         phoneNumber,
//         userId: user._id,
//       },
//     });
//   } catch (err) {
//     console.error('Token verification failed:', err);
//     return res.status(401).json({ success: false, message: 'Invalid or expired token' });
//   }
// };


////Barrath
import createUser from '../models/User.js';

export const firebaseTokenAuth = async (req, res) => {
  try {
    const { token, phoneNumber, uid } = req.body;
    if (!token || !phoneNumber || !uid) {
      return res.status(400).json({ success: false, message: 'Missing parameters' });
    }

    // ✅ Step 1: Verify token from Firebase
    const decoded = await admin.auth().verifyIdToken(token);

    if (decoded.uid !== uid || decoded.phone_number !== phoneNumber) {
      return res.status(401).json({ success: false, message: 'Token/user info mismatch' });
    }

    // ✅ Step 2: Check if user exists, if not CREATE IT
    const User = createUser(req.conn1);
    let user = await User.findOne({ mobile: phoneNumber });

    // 🔥 FIX: Create user if doesn't exist
    if (!user) {
      user = new User({
        mobile: phoneNumber,
        signupStatus: false,
        createdOn: new Date(),
        modifiedOn: new Date()
      });
      await user.save();
      console.log('New user created:', phoneNumber);
    }

    // ✅ Step 3: Respond with user status
    return res.json({
      success: true,
      message: 'Firebase token verified',
      data: {
        userStatus: user.signupStatus ? 'existing_user' : 'new_user',
        phoneNumber,
      },
    });
  } catch (err) {
    console.error('Token verification failed:', err);
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

