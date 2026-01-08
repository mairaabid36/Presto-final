# MongoDB Setup Guide - Step by Step

## 🎯 Quick Choice: Which MongoDB Should You Use?

### Option 1: MongoDB Atlas (Cloud) ⭐ RECOMMENDED
- ✅ **FREE** tier available
- ✅ No installation needed
- ✅ Works immediately
- ✅ Accessible from anywhere
- ⏱️ Setup time: 5-10 minutes

### Option 2: Local MongoDB
- ✅ No account needed
- ❌ Requires installation
- ❌ Only works on your computer
- ⏱️ Setup time: 15-20 minutes

---

## 📘 Option 1: MongoDB Atlas Setup (RECOMMENDED)

### Step 1: Create Free Account
1. Go to: **https://www.mongodb.com/cloud/atlas**
2. Click **"Try Free"** or **"Sign Up"**
3. Sign up with:
   - Email
   - Password
   - Or use Google/GitHub

### Step 2: Create Free Cluster
1. After login, click **"Build a Database"**
2. Choose **FREE** tier (M0)
3. Select:
   - **Cloud Provider**: AWS (or any)
   - **Region**: Choose closest to you
   - **Cluster Name**: Leave default or name it "presto-cluster"
4. Click **"Create"** (takes 3-5 minutes)

### Step 3: Create Database User
1. While cluster is creating, set up database access:
2. Go to **"Database Access"** (left sidebar)
3. Click **"Add New Database User"**
4. Choose **"Password"** authentication
5. Enter:
   - **Username**: `presto_user` (or any name)
   - **Password**: Create a strong password (save it!)
6. Click **"Add User"**

### Step 4: Configure Network Access
1. Go to **"Network Access"** (left sidebar)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for development)
   - Or add your current IP: `0.0.0.0/0`
4. Click **"Confirm"**

### Step 5: Get Connection String
1. Go back to **"Database"** (left sidebar)
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string (looks like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<username>` and `<password>` with your database user credentials
6. Add database name at the end: `/presto`

**Final connection string should look like:**
```
mongodb+srv://presto_user:YourPassword123@cluster0.xxxxx.mongodb.net/presto?retryWrites=true&w=majority
```

### Step 6: Update .env File
1. Open `.env` file in your project
2. Replace the `MONGODB_URI` line with your connection string:
   ```env
   MONGODB_URI=mongodb+srv://presto_user:YourPassword123@cluster0.xxxxx.mongodb.net/presto?retryWrites=true&w=majority
   PORT=3000
   ```
3. Save the file

### Step 7: Test Connection
```bash
npm start
```

You should see: `✅ Connected to MongoDB`

---

## 📗 Option 2: Local MongoDB Setup

### Step 1: Download MongoDB
1. Go to: **https://www.mongodb.com/try/download/community**
2. Select:
   - **Version**: Latest
   - **Platform**: Windows
   - **Package**: MSI
3. Click **"Download"**

### Step 2: Install MongoDB
1. Run the downloaded `.msi` file
2. Choose **"Complete"** installation
3. Check **"Install MongoDB as a Service"**
4. Check **"Install MongoDB Compass"** (GUI tool)
5. Click **"Install"**

### Step 3: Verify Installation
1. Open Command Prompt or PowerShell
2. Run: `mongod --version`
3. Should show MongoDB version

### Step 4: Start MongoDB Service
MongoDB should start automatically as a Windows service.

To check:
1. Press `Win + R`
2. Type `services.msc`
3. Find **"MongoDB"** service
4. Make sure it's **"Running"**

### Step 5: Your .env File
Your `.env` file already has the correct URL:
```env
MONGODB_URI=mongodb://localhost:27017/presto
PORT=3000
```

### Step 6: Test Connection
```bash
npm start
```

You should see: `✅ Connected to MongoDB`

---

## 🔧 Troubleshooting

### MongoDB Atlas Issues
- **"Authentication failed"**: Check username/password in connection string
- **"IP not whitelisted"**: Add `0.0.0.0/0` to Network Access
- **"Connection timeout"**: Check internet connection

### Local MongoDB Issues
- **"Cannot connect"**: Make sure MongoDB service is running
- **"Port 27017 in use"**: Another MongoDB instance is running
- **"Access denied"**: Run as administrator

---

## ✅ Quick Test

After setup, test your connection:
```bash
npm start
```

Look for: `✅ Connected to MongoDB`

Then open your website (`index.html`) and try signing up a user!



