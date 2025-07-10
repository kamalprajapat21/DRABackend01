// backend/config/firebaseAdmin.js
import admin from 'firebase-admin';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// ES6 way to get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let serviceAccount;

// Check if we're in production (Render) or development
if (process.env.NODE_ENV === 'production') {
  // In production, use environment variables
  console.log('🔥 Firebase: Using environment variables for production');
  
  // Check if all required Firebase environment variables are present
  const requiredVars = [
    'FIREBASE_TYPE', 'FIREBASE_PROJECT_ID', 'FIREBASE_PRIVATE_KEY_ID',
    'FIREBASE_PRIVATE_KEY', 'FIREBASE_CLIENT_EMAIL', 'FIREBASE_CLIENT_ID',
    'FIREBASE_AUTH_URI', 'FIREBASE_TOKEN_URI', 'FIREBASE_AUTH_PROVIDER_X509_CERT_URL',
    'FIREBASE_CLIENT_X509_CERT_URL'
  ];
  
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('❌ Firebase: Missing environment variables:', missingVars);
    throw new Error(`Firebase configuration incomplete. Missing: ${missingVars.join(', ')}`);
  }
  
  serviceAccount = {
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
  };
  
  console.log('✅ Firebase: Environment variables loaded successfully');
} else {
  // In development, use the local file
  console.log('🔥 Firebase: Using local serviceAccountKey.json for development');
  const serviceAccountPath = path.resolve(__dirname, '../serviceAccountKey.json');
  
  if (!fs.existsSync(serviceAccountPath)) {
    throw new Error('serviceAccountKey.json not found. Please ensure the file exists in the root directory.');
  }
  
  serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
  console.log('✅ Firebase: Local file loaded successfully');
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin; 