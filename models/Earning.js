// //backend/models/Earning.js
// import mongoose from 'mongoose';

// const earningSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   totalCompletedBookings: { type: Number, default: 0, min: [0, 'Total Completed Bookings cannot be negative'] },
//   totalEarnings: { type: Number, default: 0, min: [0, 'Total Earnings cannot be negative'] },
//   totalRedeemed: { type: Number, default: 0, min: [0, 'Total Redeemed cannot be negative'] },
//   availableBalance: { type: Number, default: 0, min: [0, 'Available Balance cannot be negative'] },
//   withdrawRequest: { type: Number, default: 0, min: [0, 'Withdraw Request cannot be negative'] },
//   status: { type: String, enum: ['yes', 'no'], default: 'yes' }
// });


// export default (conn) => conn.model('Earning', earningSchema);

// //backend/models/Earning.js
// import mongoose from 'mongoose';

// const earningSchema = new mongoose.Schema({
//   labownermobile:String,
//   totalCompletedBookings: { type: Number, default: 0, min: [0, 'Total Completed Bookings cannot be negative'] },
//   totalEarnings: { type: Number, default: 0, min: [0, 'Total Earnings cannot be negative'] },
//   totalRedeemed: { type: Number, default: 0, min: [0, 'Total Redeemed cannot be negative'] },
//   availableBalance: { type: Number, default: 0, min: [0, 'Available Balance cannot be negative'] },
//   withdrawRequest: { type: Number, default: 0, min: [0, 'Withdraw Request cannot be negative'] },
//   status: { type: String, enum: ['yes', 'no'], default: 'yes' }
// });


// export default (conn) => conn.model('Earning', earningSchema);




// // models/Earning.js
// import mongoose from 'mongoose';

// const withdrawalSchema = new mongoose.Schema({
//   amount: { type: Number, required: true, min: 1 },
//   date: { type: Date, default: Date.now },
// });

// const earningSchema = new mongoose.Schema({
//   // labownermobile: { type: String, required: true },
//   draId: String, // Unique DRA identifier instead of phone number

//   totalCompletedBookings: { type: Number, default: 0, min: 0 },
//   totalEarnings: { type: Number, default: 0, min: 0 },
//   totalRedeemed: { type: Number, default: 0, min: 0 },
//   availableBalance: { type: Number, default: 0, min: 0 },
//   withdrawRequest: { type: Number, default: 0, min: 0 },
//   status: { type: String, enum: ['yes', 'no'], default: 'yes' },
//   withdrawals: [withdrawalSchema], // ✅ withdrawal history
// });

// export default (conn) => conn.model('Earning', earningSchema);





/////KamalCode
// models/EarningModel.js
import mongoose from 'mongoose';

const historySchema = new mongoose.Schema({
  amount: Number,
  serviceName: String,
  bookingId: String,
  date: { type: Date, default: Date.now }
});

const withdrawalSchema = new mongoose.Schema({
  amount: Number,
  date: { type: Date, default: Date.now }
});

const earningSchema = new mongoose.Schema({
  draId: { type: String, required: true },
  totalEarnings: { type: Number, default: 0 },
  redeemedAmount: { type: Number, default: 0 },
  totalCases: { type: Number, default: 0 },
  history: [historySchema],
  withdrawalHistory: [withdrawalSchema]
});

export default function createEarningModel(conn) {
  return conn.models.Earning || conn.model('Earning', earningSchema);
}
