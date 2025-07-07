// backend/models/Document.js

import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  // Other fields as per your requirement
  aadharCards: [{
    type: String, // Assuming storing file paths
    required: true
  }],
  // Other fields
});


export default (conn) => conn.model('Document', documentSchema);
