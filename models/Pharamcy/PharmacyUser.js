// const createPharmacyUserModel = (conn3) => {
//   const mongoose = require('mongoose');

//   const pharmacyUserSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     phone: String,
//     address: String
//   }, { collection: 'user1' });

//   return conn3.model('PharmacyUser', pharmacyUserSchema);
// };

// export default createPharmacyUserModel;





// ❌ Don't use require
// const mongoose = require('mongoose');

// ✅ Use import instead
import mongoose from 'mongoose';

const pharmacyUserSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String
}, { collection: 'user1' });

const createPharmacyUserModel = (conn3) => {
  return conn3.model('PharmacyUser', pharmacyUserSchema);
};

export default createPharmacyUserModel;
