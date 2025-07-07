// // backend/models/User.js
// import mongoose from 'mongoose';
// import { Schema } from 'mongoose';

// const userSchema = mongoose.Schema({
//   firstName: { type: String, required: false },
//   lastName: { type: String, required: false },
//   mobile: { type: String, required: true, unique: true },
//   otpSignup: { type: String },
//   otp: { type: String },
//   signupStatus: { type: Boolean, default: false },
//   createdOn: { type: Date, default: Date.now },
//   modifiedOn: { type: Date, default: Date.now },
//   modifiedBy: { type: String },
//   createdBy: { type: String },
//   User1: [{type:Schema.Types.ObjectId,ref:'User1 '}]
// });

// const User = mongoose.model('User', userSchema);

// export default User;

// booking2
import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  mobile: { type: String, unique: true },
  otpSignup: { type: String },
  otp: { type: String },
  signupStatus: { type: Boolean, default: false },
  createdOn: { type: Date, default: Date.now },
  modifiedOn: { type: Date, default: Date.now },
  modifiedBy: { type: String },
  createdBy: { type: String },
  bookingDbName: { type: String, }
});

export default (conn) => conn.model('User', userSchema);


