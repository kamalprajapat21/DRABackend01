import mongoose from "mongoose";

const earningSchema = new mongoose.Schema({
  serviceAmount: {
    type: Number,
    required: true
  },
  tds: {
    type: Number,
    required: true
  },
  convenienceFee: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Earning", earningSchema);
