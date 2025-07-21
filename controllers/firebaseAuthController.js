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

export const firebaseTokenAuth = async (req, res) => {
  try {
    console.log('Received body:', req.body); // ✅ Add this

    const { token, phoneNumber, uid } = req.body;
    if (!token || !phoneNumber || !uid) {
      return res.status(400).json({ success: false, message: 'Missing parameters' });
    }

    const decoded = await admin.auth().verifyIdToken(token);

    if (decoded.uid !== uid || decoded.phone_number !== phoneNumber) {
      return res.status(401).json({ success: false, message: 'Token/user info mismatch' });
    }

    const User = createUserModel(req.conn1);
    const user = await User.findOne({ mobile: phoneNumber });

    return res.json({
      success: true,
      message: 'Firebase token verified',
      data: {
        userStatus: user ? 'existing_user' : 'new_user',
        phoneNumber,
      },
    });
  } catch (err) {
    console.error('Token verification failed:', err);
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

