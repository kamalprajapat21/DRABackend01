// models/PwaUser.js
import mongoose from 'mongoose';

const pwaUserSchema = new mongoose.Schema({
  mobileNumber: {
    type: String,
    required: true,
    unique: true
  },
  // other fields if needed
});

const PwaUser = mongoose.model('PwaUser', pwaUserSchema);
export default PwaUser;
