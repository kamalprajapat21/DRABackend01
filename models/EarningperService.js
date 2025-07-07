
// models/Earning.js
import mongoose from 'mongoose';

const earningSchema = new mongoose.Schema({
  labId: {
    type: String, // or use: mongoose.Schema.Types.ObjectId if you want to reference DRA model
    required: true,
    ref: 'DRA',
  },
  serviceAmount: {
    type: Number,
    required: true,
  },
  tds: {
    type: Number,
    required: true,
  },
  convenienceFee: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

// Export factory function that works with any DB connection
export const createEarningModel = (conn) => {
  return conn.model('Earning', earningSchema);
};
