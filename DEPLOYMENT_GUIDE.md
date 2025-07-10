# Deployment Guide for Render

## Prerequisites
1. A GitHub account with your code repository
2. A Render account (free tier available)
3. Firebase project with service account key
4. MongoDB database (MongoDB Atlas recommended)

## Step 1: Prepare Your Firebase Service Account

1. Go to your Firebase Console
2. Navigate to Project Settings > Service Accounts
3. Click "Generate new private key"
4. Download the JSON file
5. **DO NOT** commit this file to GitHub (it's already in .gitignore)

## Step 2: Extract Firebase Environment Variables

From your `serviceAccountKey.json` file, extract these values:

```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "your-private-key-id",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com",
  "client_id": "your-client-id",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xxxxx%40your-project.iam.gserviceaccount.com"
}
```

## Step 3: Deploy to Render

### Option A: Using Render Dashboard (Recommended)

1. **Sign up/Login to Render**
   - Go to [render.com](https://render.com)
   - Sign up with your GitHub account

2. **Create New Web Service**
   - Click "New +" > "Web Service"
   - Connect your GitHub repository
   - Select your repository

3. **Configure the Service**
   - **Name**: `dra-backend` (or any name you prefer)
   - **Environment**: `Node`
   - **Region**: Choose closest to your users
   - **Branch**: `main` (or your default branch)
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

4. **Add Environment Variables**
   Click "Environment" tab and add these variables:

   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI_1=your_mongodb_connection_string_1
   MONGODB_URI_2=your_mongodb_connection_string_2
   MONGODB_URI_3=your_mongodb_connection_string_3
   FIREBASE_TYPE=service_account
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_PRIVATE_KEY_ID=your_private_key_id
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
   FIREBASE_CLIENT_EMAIL=your_service_account_email
   FIREBASE_CLIENT_ID=your_client_id
   FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
   FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
   FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
   FIREBASE_CLIENT_X509_CERT_URL=your_cert_url
   JWT_SECRET=your_jwt_secret_key
   ```

   **Important**: For `FIREBASE_PRIVATE_KEY`, copy the entire private key including the `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` parts.

5. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy your app

### Option B: Using render.yaml (Blue-Green Deployment)

1. Push your code with the `render.yaml` file to GitHub
2. In Render dashboard, click "New +" > "Blueprint"
3. Connect your repository
4. Render will automatically configure everything from the yaml file
5. Add your environment variables in the dashboard

## Step 4: Verify Deployment

1. **Check Build Logs**
   - Go to your service in Render dashboard
   - Check the "Logs" tab for any build errors

2. **Test Your API**
   - Your app will be available at: `https://your-app-name.onrender.com`
   - Test your endpoints to ensure they work

3. **Common Issues & Solutions**

   **Issue**: "ENOENT: no such file or directory, open '/opt/render/project/src/serviceAccountKey.json'"
   **Solution**: Make sure you've added all Firebase environment variables in Render dashboard

   **Issue**: "MongoDB connection failed"
   **Solution**: Check your MongoDB connection strings and ensure your MongoDB Atlas cluster allows connections from anywhere (0.0.0.0/0)

   **Issue**: "Firebase initialization failed"
   **Solution**: Verify all Firebase environment variables are correctly set, especially the private key

## Step 5: Update Your Frontend

Update your frontend API base URL to point to your Render deployment:

```javascript
// Replace localhost:5000 with your Render URL
const API_BASE_URL = 'https://your-app-name.onrender.com';
```

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Server port | `10000` |
| `MONGODB_URI_1` | Primary MongoDB connection | `mongodb+srv://...` |
| `MONGODB_URI_2` | Secondary MongoDB connection | `mongodb+srv://...` |
| `MONGODB_URI_3` | Tertiary MongoDB connection | `mongodb+srv://...` |
| `FIREBASE_PROJECT_ID` | Firebase project ID | `your-project-id` |
| `FIREBASE_PRIVATE_KEY` | Firebase private key | `-----BEGIN PRIVATE KEY-----\n...` |
| `FIREBASE_CLIENT_EMAIL` | Firebase service account email | `firebase-adminsdk-...` |
| `JWT_SECRET` | JWT signing secret | `your-secret-key` |

## Security Notes

1. **Never commit sensitive files** like `serviceAccountKey.json` to GitHub
2. **Use environment variables** for all sensitive configuration
3. **Rotate secrets regularly** for production applications
4. **Monitor your Render logs** for any security issues

## Troubleshooting

### Build Fails
- Check the build logs in Render dashboard
- Ensure all dependencies are in `package.json`
- Verify the build command is correct

### Runtime Errors
- Check the runtime logs in Render dashboard
- Verify all environment variables are set
- Test your database connections

### Performance Issues
- Consider upgrading to a paid Render plan for better performance
- Optimize your database queries
- Use caching where appropriate

## Support

If you encounter issues:
1. Check Render's documentation: [docs.render.com](https://docs.render.com)
2. Review the build and runtime logs
3. Verify all environment variables are correctly set
4. Test your application locally with the same environment variables 