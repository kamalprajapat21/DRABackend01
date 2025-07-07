import createPharmacyUserModel from '../../models/Pharamcy/PharmacyUser.js';
import mongoose from 'mongoose';



export const getAllPharmacies = async (req, res) => {
  try {
    const { conn3 } = req.app.locals;
    console.log("conn3 exists:", !!conn3); // ✅ Check if conn3 is set

    const PharmacyUser = createPharmacyUserModel(conn3);
    const pharmacies = await PharmacyUser.find();

    res.status(200).json(pharmacies);
  } catch (err) {
    console.error("Error in getAllPharmacies:", err); // ✅ Log real error
    res.status(500).json({ error: "Failed to fetch pharmacies" });
  }
};










export const getPharmacyById = async (req, res) => {
  try {
    const { conn3 } = req.app.locals;
    const PharmacyUser = createPharmacyUserModel(conn3);

    const { id } = req.params;

    // Validate the format of ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid pharmacy ID format' });
    }

    const pharmacy = await PharmacyUser.findById(id);

    if (!pharmacy) {
      return res.status(404).json({ message: 'Pharmacy not found' });
    }

    res.status(200).json(pharmacy);
  } catch (error) {
    console.error('Error fetching pharmacy by ID:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};


// import createPharmacyUserModel from '../../models/Pharamcy/PharmacyUser.js';

export const getPharmacyLabNameById = async (req, res) => {
  try {
    const { conn3 } = req.app.locals;
    const PharmacyUser = createPharmacyUserModel(conn3);

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid pharmacy ID' });
    }

    // 📌 Fetch only labName using projection
    const pharmacy = await PharmacyUser.findById(id).select('labName').lean();

    if (!pharmacy) {
      return res.status(404).json({ message: 'Pharmacy not found' });
    }

    res.status(200).json({ labName: pharmacy.labName });
  } catch (error) {
    console.error('Error fetching labName:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

