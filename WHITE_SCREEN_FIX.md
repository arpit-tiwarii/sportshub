# 🔴 White Screen Troubleshooting Guide

## What Just Happened

I've added **error handling** to your frontend to catch and display errors instead of showing a blank screen. The fix is now being deployed to Netlify.

**Wait 2-3 minutes for Netlify to rebuild**, then refresh your site.

---

## 🔍 If White Screen Still Appears

### Step 1: Open DevTools
1. **Visit your Netlify site**
2. **Press F12** on keyboard
3. Click **"Console"** tab

### Step 2: Look for Errors
You'll see one of these:

#### Error Type A: CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**Cause**: Backend API not accessible
**Fix**: Check backend is running and FRONTEND_URL is set in Render environment

#### Error Type B: API 404 Error
```
404 Not Found
```
**Cause**: Backend endpoint doesn't exist
**Fix**: Verify backend is deployed and running

#### Error Type C: Network Error
```
net::ERR_NAME_NOT_RESOLVED
```
**Cause**: Cannot reach backend server
**Fix**: Check backend URL is correct

#### Error Type D: Component Error
```
Cannot read properties of undefined
```
**Cause**: Missing data or component issue
**Fix**: Check specific component error message

---

## ✅ Step-by-Step Fix Checklist

### 1. Verify Backend is Running

**Visit your backend API directly:**
```
https://sportshub-backend-mzth.onrender.com/api/auth/profile
```

**Expected Result:**
- Error 401 (Unauthorized) - **GOOD!** Backend is working
- Error 404 or timeout - **BAD** Backend is down

**If backend is down:**
1. Go to [Render Dashboard](https://render.com)
2. Select `sportshub-backend`
3. Check the **Logs** tab for errors
4. Look for MongoDB connection error

### 2. Verify Environment Variables

**On Netlify:**
1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Select your site
3. Click **Site settings** → **Build & deploy** → **Environment**
4. Check `VITE_API_URL` is set to:
   ```
   https://sportshub-backend-mzth.onrender.com/api
   ```

**On Render:**
1. Go to [Render Dashboard](https://render.com)
2. Select `sportshub-backend`
3. Click **Environment**
4. Verify:
   - `MONGODB_URI` is set (should be MongoDB Atlas connection string)
   - `FRONTEND_URL` is set to your Netlify domain

### 3. Check Netlify Build Logs

1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Select your site
3. Click **Deploys** tab
4. Click the latest deploy
5. Scroll down to see build output
6. Look for red errors in the log

**Common Build Errors:**
- `Module not found` → missing dependency
- `SyntaxError` → code error
- `CRITICAL ERROR in compilation` → Webpack/Vite error

### 4. Check Browser Console For Warnings

Open DevTools → Console and look for:
- **Red error messages** (critical)
- **Yellow warnings** (may be ok)
- **Blue info** (can ignore)

---

## 🛠️ Most Common Solutions

### Problem: "Cannot GET /"
**Cause**: Frontend not deployed properly
**Solution:**
1. Go to Netlify → Site settings → Build & deploy
2. Check publish directory is `frontend/dist`
3. Click "Trigger deploy" → "Deploy site"

### Problem: "CORS error from backend"
**Cause**: Backend doesn't recognize your frontend domain
**Solution:**
1. Go to Render → `sportshub-backend` → Environment
2. Update `FRONTEND_URL` to your Netlify URL
3. Save and wait for redeploy

### Problem: "MongoDB connection failed"
**Cause**: Database not configured
**Solution:**
1. Go to Render → `sportshub-backend` → Environment
2. Verify `MONGODB_URI` has your Atlas connection string
3. Check [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) has IP whitelist set to 0.0.0.0/0

### Problem: "Module not found" in build log
**Cause**: Missing npm package
**Solution:**
```bash
cd c:\Users\arpit\Desktop\sportshub\frontend
npm install
```
Then push to GitHub to retrigger Netlify build

### Problem: Netlify shows "Application error"
**Cause**: Build failed
**Solution:**
1. Check build logs (see Step 3 above)
2. Fix the error in your code
3. `git push origin main` to redeploy

---

## 🔗 Check These URLs

Test each of these in your browser:

| URL | Expected | If Error |
|-----|----------|----------|
| `https://sportshub-xyz.netlify.app` | Home page loads | Frontend issue |
| `https://sportshub-xyz.netlify.app/login` | Login page loads | Frontend issue |
| `https://sportshub-backend-mzth.onrender.com` | "Cannot GET /" text | Backend working |
| `https://sportshub-backend-mzth.onrender.com/api/auth/profile` | 401 Unauthorized | Backend working |

---

## 📊 Network Tab Debugging

1. Open DevTools → **Network** tab
2. **Refresh the page** (Ctrl+R)
3. Look at API requests:
   - Click on API request (like `/api/...`)
   - Check **Response** tab for data or errors
   - Check **Status** code (should be 200, 401, or other HTTP code - NOT timeout)

**What to look for:**
- ✅ Requests complete (blue)
- ❌ Red requests = failed
- ❌ Crossed out requests = blocked by CORS

---

## 🆘 Still Not Working?

**Copy this info and check each:**

### Check 1: Local Frontend Build
```powershell
cd c:\Users\arpit\Desktop\sportshub\frontend
npm run build
```
Should complete without errors.

### Check 2: Test Backend Locally
```powershell
cd c:\Users\arpit\Desktop\sportshub\backend
npm start
```
Should say "Server running on port 8000"

### Check 3: Test API Locally
Visit: `http://localhost:8000/api/auth/profile`
Should show 401 error (not connection error)

---

## 📋 Diagnosis Form

When asking for help, provide:

1. **What do you see?**
   - Blank white screen?
   - Error message?
   - Partial page?

2. **Browser console error** (if any):
   - Copy exact error message

3. **Which step are you on?**
   - Just deployed?
   - Trying to register?
   - Trying to login?

4. **What URLs work/don't work?**
   - Test list above

---

## 🎯 Expected Behavior After Fix

✅ **Step 1: Homepage loads**
- See SportsHub logo and hero section
- Page styling looks correct (dark theme)
- No errors in console

✅ **Step 2: Can click Register**
- Register page loads
- Form appears

✅ **Step 3: Can click Login**
- Login page loads
- Can try login (will show error if no account)

✅ **Step 4: Backend working**
- DevTools → Network tab shows API requests
- Requests go to `https://sportshub-backend-mzth.onrender.com`
- Status codes like 200, 401, etc. (not timeout)

---

## 💡 Pro Tips

1. **Hard refresh** in browser: `Ctrl+Shift+R` (clears cache)
2. **Check Render logs** for backend errors first (usually database)
3. **Disable extensions** that might block requests (ad blockers, etc.)
4. **Test in incognito mode** to rule out cached data

---

## 🔗 Quick Links

- **Netlify Dashboard**: https://app.netlify.com
- **Render Dashboard**: https://render.com
- **MongoDB Atlas**: https://www.mongodb.com/cloud/atlas
- **GitHub Repo**: https://github.com/arpit-tiwarii/sportshub

---

**The fix is deploying now. Give it 2-3 minutes and refresh! 🚀**
