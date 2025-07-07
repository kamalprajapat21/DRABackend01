import mongoose from 'mongoose';

const vaccinationServiceSchema = new mongoose.Schema({
  prescription: String,
});

// export default mongoose.model('addreportcard', vaccinationServiceSchema);
export default (conn) => conn.model('addreportcard', vaccinationServiceSchema);
