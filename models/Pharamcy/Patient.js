// const createPatientModel = (conn2) => {
//   const mongoose = require('mongoose');

//   const patientSchema = new mongoose.Schema({
//     fullName: String,
//     age: Number,
//     gender: String,
//     phone: String,
//     email: String,
//     addressLine1: String,
//     // Add more fields based on the structure inside `workitsraj` collection
//   }, { collection: 'workitsraj' }); // If collection name is different, update this

//   return conn2.model('Patient', patientSchema);
// };

// export default createPatientModel;





import mongoose from 'mongoose';

const createPatientModel = (conn2) => {
  const patientSchema = new mongoose.Schema({
    fullName: String,
    age: Number,
    gender: String,
    phone: String,
    email: String,
    addressLine1: String,
    // Add more fields if needed
  }, { collection: 'user1' });

  return conn2.model('Patient', patientSchema);
};

export default createPatientModel;
