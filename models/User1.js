// // backend/models/User1.js
// import mongoose from 'mongoose';
// import { v4 as uuidv4 } from 'uuid';


// const user1Schema = new mongoose.Schema({
//   mobile: { type: String, required: true, unique: true },
//   DraId: { type: String, default:uuidv4 },
//   // labownerId: { type: String, default:uuidv4 },
//   fullName: String,
//   labName: String,
//   labAddress1: String,
//   labAddress2: String,
//   city: String,
//   state: String,
//   labPhoto: String,


//   aadharCard: String,
//   panCard: String,
//   labLicense: String,
//   // labEstablishedLicense: String,
//   // nablLicense: String,
//   gstCertificate: String,


//   bankName: String,
//   accountNumber: String,
//   ifscCode: String,
//   uploadbankstatement: String,
//   signupStep: { type: Number, default: 0 },
//   signupCompleted: { type: Boolean, default: false },
//   createdOn: { type: Date, default: Date.now },
//   modifiedOn: { type: Date, default: Date.now }
// });

// // export default mongoose.model('User1', user1Schema);
// export default (conn) => conn.model('User1', user1Schema);




// Assin uniqueId form Name + 3 digit random number

// import mongoose from 'mongoose';

// const user1Schema = new mongoose.Schema({
//   mobile: { type: String, required: true, unique: true },
//   DraId: { type: String, unique: true },
//   fullName: String,
//   labName: String,
//   labAddress1: String,
//   labAddress2: String,
//   city: String,
//   state: String,
//   labPhoto: String,
//   aadharCard: String,
//   panCard: String,
//   labLicense: String,
//   gstCertificate: String,
//   bankName: String,
//   accountNumber: String,
//   ifscCode: String,
//   uploadbankstatement: String,
//   signupStep: { type: Number, default: 0 },
//   signupCompleted: { type: Boolean, default: false },
//   createdOn: { type: Date, default: Date.now },
//   modifiedOn: { type: Date, default: Date.now }
// });

// // // Pre-save hook to generate unique DraId
// // user1Schema.pre('save', async function (next) {
// //   if (!this.DraId) {
// //     const prefix = this.fullName ? this.fullName.substring(0, 3).toUpperCase() : Math.floor(100 + Math.random() * 900).toString();
// //     let uniqueDraId;
// //     let isUnique = false;

// //     while (!isUnique) {
// //       const suffix = Math.floor(100 + Math.random() * 900); // 3-digit random number
// //       uniqueDraId = `${prefix}${suffix}`;

// //       const existing = await this.constructor.findOne({ DraId: uniqueDraId });
// //       if (!existing) {
// //         isUnique = true;
// //       }
// //     }

// //     this.DraId = uniqueDraId;
// //   }

// //   next();
// // });

// export default (conn) => conn.model('User1', user1Schema);





/////UPDATED CODE
// models/User1.js
import mongoose from 'mongoose';

const user1Schema = new mongoose.Schema({
  mobile: { type: String, required: true, unique: true },
  DraId: { type: String, unique: true },
  fullName: String,
  labName: String,
  labAddress1: String,
  labAddress2: String,
  city: String,
  state: String,
  labPhoto: String,
  aadharCard: String,
  panCard: String,
  labLicense: String,
  gstCertificate: String,
  bankName: String,
  accountNumber: String,
  ifscCode: String,
  uploadbankstatement: String,
  signupStep: { type: Number, default: 0 },
  signupCompleted: { type: Boolean, default: false },
  createdOn: { type: Date, default: Date.now },
  modifiedOn: { type: Date, default: Date.now }
});

// Generate unique DraId before saving
user1Schema.pre('save', async function (next) {
  if (!this.DraId) {
    const prefix = this.fullName
      ? this.fullName.substring(0, 3).toUpperCase()
      : Math.floor(100 + Math.random() * 900).toString();
    let uniqueDraId;
    let isUnique = false;

    while (!isUnique) {
      const suffix = Math.floor(100 + Math.random() * 900);
      uniqueDraId = `${prefix}${suffix}`;

      const existing = await this.constructor.findOne({ DraId: uniqueDraId });
      if (!existing) {
        isUnique = true;
      }
    }

    this.DraId = uniqueDraId;
  }

  next();
});

export default (conn) => conn.model('User1', user1Schema);
