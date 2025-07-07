import createUser1 from '../../models/User1.js';
import createLab from '../../models/BOOKING/Lab.js';

const createLabWithOwner = async (req, res) => {
  try {
    
    const User1=createUser1(req.conn2)
    const Lab=createLab(req.conn2)

    const { } = req.body; // Assuming you have userId in the request

    // Fetch the labownerId from User1
    const user = await User1.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Create a new Lab document using the same labownerId
    const newLab = new Lab({
      labownerId: user.labownerId,
      // other fields you need to set...
    });

    await newLab.save();
    res.status(201).json(newLab);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create lab', error });
  }
};
