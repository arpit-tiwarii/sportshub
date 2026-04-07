# SportsHub Deployment Guide

## Step 1: Push to GitHub

### 1.1 Create Repository on GitHub
1. Go to [GitHub New Repository](https://github.com/new)
2. Repository name: `sportshub`
3. Description: `SportsHub - Sports Registration & Payment Management Platform`
4. Choose Public (for free deployment)
5. Click "Create repository"

### 1.2 Push Code to GitHub
Run the following commands in your terminal:

```bash
# Navigate to your project
cd c:\Users\arpit\Desktop\sportshub

# Add GitHub remote
git remote add origin https://github.com/arpit-tiwarii/sportshub.git

# Rename main branch if needed
git branch -M main

# Push to GitHub
git push -u origin main
```

You'll be prompted to authenticate. Use your GitHub token as the password.

---

## Step 2: Deploy Frontend on Netlify

### Prerequisites
- Build your frontend first
```bash
cd frontend
npm run build
```

### 2.1 Deploy via Netlify
1. Go to [Netlify](https://netlify.com)
2. Click "New site from Git"
3. Connect your GitHub account and select `sportshub` repository
4. Set build settings:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/dist`
5. Add Environment Variables (if needed):
   - `VITE_API_URL`: Set to your Render backend URL
6. Click "Deploy"

---

## Step 3: Deploy Backend on Render

### 3.1 Prepare Backend
1. Create `.env` file in backend folder with:
```
NODE_ENV=production
PORT=3001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

2. Update your MongoDB connection for production (use MongoDB Atlas free tier)

### 3.2 Deploy via Render
1. Go to [Render](https://render.com)
2. Click "New +"  → "Web Service"
3. Connect GitHub repository
4. Set deployment settings:
   - Name: `sportshub-backend`
   - Runtime: `Node`
   - Root Directory: `backend`
   - Build command: `npm install`
   - Start command: `npm start` or `node server.js`
5. Add Environment Variables from your `.env` file
6. Click "Create Web Service"

Your backend will get a URL like: `https://sportshub-backend.onrender.com`

### 3.3 Update Frontend API URL
After backend is deployed:
1. Add to Netlify environment variables:
   - `VITE_API_URL`: `https://sportshub-backend.onrender.com`
2. Redeploy frontend on Netlify

---

## Step 4: Database Setup

### Using MongoDB Atlas (Free Tier)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create a cluster
4. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/sportshub`
5. Add this to your backend `.env` as `MONGODB_URI`

---

## Important Notes

⚠️ **Before Deploying:**
- [ ] Check backend `server.js` for correct database connection
- [ ] Set up CORS for your frontend domain
- [ ] Update payment gateway configuration if using Stripe/PayPal
- [ ] Set secure environment variables (never commit `.env`)

### Update Backend for Production

In `backend/server.js`, add CORS for your Netlify domain:
```javascript
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
};
app.use(cors(corsOptions));
```

### Add to Backend `.env`
```
FRONTEND_URL=https://your-netlify-domain.netlify.app
```

---

## Final URLs

Once deployed:
- **Frontend**: https://sportshub-*.netlify.app
- **Backend API**: https://sportshub-backend.onrender.com
- **GitHub**: https://github.com/arpit-tiwarii/sportshub

---

## Troubleshooting

### Backend Start Issues on Render
- Ensure `package.json` has `"start": "node server.js"` script
- Check MongoDB connection string in `.env`
- View logs on Render dashboard

### Frontend Build Errors
- Run `npm run build` locally first to check for errors
- Check that all environment variables are set correctly
- Clear cache and rebuild on Netlify

---

## Keeping Code Updated

After initial deployment, to push updates:
```bash
git add .
git commit -m "Update: [description]"
git push origin main
```

Both Netlify and Render will auto-deploy on git push!
