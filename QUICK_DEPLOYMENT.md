# SportsHub - Quick Deployment Guide

## 📋 Quick Start Checklist

- [ ] Push code to GitHub
- [ ] Deploy backend on Render
- [ ] Deploy frontend on Netlify
- [ ] Configure environment variables
- [ ] Test live application

---

## 🚀 STEP 1: Push to GitHub

### 1.1 Create GitHub Repository
1. Visit: https://github.com/new
2. Repository name: `sportshub`
3. Description: `Sports Registration & Payment Management Platform`
4. Select "Public"
5. Click "Create repository"

### 1.2 Push Your Code
Run these commands in PowerShell in your project root:

```powershell
cd c:\Users\arpit\Desktop\sportshub

# Add GitHub remote
git remote add origin https://github.com/arpit-tiwarii/sportshub.git

# Verify remote is added
git remote -v

# Push code to GitHub
git push -u origin main
```

When prompted for authentication:
- **Username**: arpit-tiwarii
- **Password**: Your GitHub Personal Access Token (or password)

**✅ Done**: Your code is now on GitHub!

---

## 🔧 STEP 2: Deploy Backend on Render

### 2.1 Create Render Account
1. Go to: https://render.com/
2. Sign up (use GitHub account)
3. Create new Web Service

### 2.2 Connect GitHub Repository
1. In Render dashboard, click "New +" → "Web Service"
2. Click "Connect GitHub account"
3. Select repository: `sportshub`
4. Authorize Render

### 2.3 Configure Deployment
Fill in these settings:

| Setting | Value |
|---------|-------|
| **Name** | `sportshub-backend` |
| **Runtime** | Node |
| **Root Directory** | `backend` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |

### 2.4 Add Environment Variables
Click "Add Environment Variable" for each:

```
NODE_ENV = production
PORT = 3001
MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/sportshub
JWT_SECRET = your-secret-key-here
FRONTEND_URL = https://your-app.netlify.app (add this after frontend deployment)
```

**For MONGODB_URI**: Use MongoDB Atlas free tier (see Step 3.1 below)

### 2.5 Deploy
Click "Create Web Service" and wait for deployment.

Once deployed, copy your backend URL (e.g., `https://sportshub-backend.onrender.com`)

**✅ Backend Live**: https://sportshub-backend.onrender.com

---

## 💾 STEP 3: Setup MongoDB Database

### 3.1 Create Free MongoDB Atlas Database
1. Go to: https://www.mongodb.com/cloud/atlas
2. Sign up (free account)
3. Create new Project → Create Cluster
4. Choose "Free Tier"
5. Wait for cluster to create (~10 minutes)

### 3.2 Get Connection String
1. Click "Connect"
2. Choose "Drivers" → "Node.js"
3. Copy the connection string
4. Replace `<password>` with your database password
5. Replace `myFirstDatabase` with `sportshub`

**Example**:
```
mongodb+srv://admin:mypassword@cluster0.abc123.mongodb.net/sportshub?retryWrites=true&w=majority
```

### 3.3 Add to Render
1. Go back to Render dashboard
2. Open your `sportshub-backend` service
3. Click "Environment"
4. Update `MONGODB_URI` with your Atlas connection string
5. Service will auto-redeploy

---

## 🎨 STEP 4: Deploy Frontend on Netlify

### 4.1 Build Frontend Locally First
```powershell
cd c:\Users\arpit\Desktop\sportshub\frontend
npm install
npm run build
```

Check for any build errors. If successful, you'll see a `dist` folder created.

### 4.2 Deploy on Netlify
1. Go to: https://netlify.com/
2. Sign up (use GitHub account)
3. Click "New site from Git"
4. Connect GitHub and select `sportshub`

### 4.3 Configure Build Settings
Fill in these settings:

| Setting | Value |
|---------|-------|
| **Base directory** | `frontend` |
| **Build command** | `npm run build` |
| **Publish directory** | `frontend/dist` |

### 4.4 Add Environment Variables
Click "Site settings" → "Build & deploy" → "Environment":

```
VITE_API_URL = https://sportshub-backend.onrender.com/api
```

### 4.5 Deploy
1. Click "Deploy"
2. Netlify will build and deploy automatically
3. Get your live URL (e.g., `https://sportshub-xyz.netlify.app`)

**✅ Frontend Live**: https://sportshub-xyz.netlify.app

---

## 🔗 STEP 5: Update Configurations

### 5.1 Update Render Environment
Now that frontend is deployed:
1. Go to Render dashboard
2. Open `sportshub-backend` service
3. Click "Environment"
4. Update `FRONTEND_URL`:
   ```
   FRONTEND_URL = https://your-netlify-domain.netlify.app
   ```
5. Service will auto-redeploy

### 5.2 Test Your Application
1. Visit your Netlify frontend URL
2. Try registering an account
3. Test login functionality
4. Try making a payment (if payment gateway is configured)

---

## 📱 Verify Production URLs

✅ **Check these URLs are working:**
```
Frontend:     https://sportshub-xyz.netlify.app
Backend API:  https://sportshub-backend.onrender.com/api
GitHub Repo:  https://github.com/arpit-tiwarii/sportshub
```

---

## 🔄 Future Updates

After initial deployment, to push updates:

```powershell
# Make your changes locally
# Then push to GitHub:

git add .
git commit -m "Update: [description of changes]"
git push origin main
```

**Netlify and Render will automatically redeploy!**

---

## 🐛 Troubleshooting

### Backend not connecting to database?
- Verify MongoDB Atlas connection string in Render environment
- Check IP whitelist in MongoDB Atlas (allow all IPs: 0.0.0.0/0)
- View logs in Render dashboard

### Frontend showing "Cannot connect to API"?
- Check `VITE_API_URL` is set correctly on Netlify
- Verify CORS settings in backend (`FRONTEND_URL`)
- Check browser console for exact error

### Render shows build fails?
- Run `npm install` locally to check for dependency errors
- Verify `package.json` has correct start script
- Check logs in Render dashboard

### Netlify shows build fails?
- Run `npm run build` locally to see exact error
- Check for missing environment variables
- Ensure postcss and tailwindcss are installed

---

## 📚 Useful Links

- **Render Docs**: https://render.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **MongoDB Atlas**: https://docs.atlas.mongodb.com
- **Vite Docs**: https://vite.dev
- **Express.js**: https://expressjs.com

---

## ✨ You're Done!

Your SportsHub application is now live on the internet! Share your URLs with others to start using the platform.

For questions or issues, check the troubleshooting section above or review the deployment docs linked above.

Good luck! 🚀
