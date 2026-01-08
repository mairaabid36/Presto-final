# 🚨 QUICK FIX: MongoDB Authentication Error

## The Problem
Your MongoDB Atlas credentials are not working. The username `AlbertJames` or password might be incorrect.

## ✅ SOLUTION: Create New Database User

### Step 1: Go to MongoDB Atlas
1. Open: https://cloud.mongodb.com/
2. Login with your account
3. Click on your cluster: **Cluster0**

### Step 2: Create New Database User
1. Click **"Database Access"** (left sidebar)
2. Click **"Add New Database User"** button
3. Choose **"Password"** authentication method
4. Enter:
   - **Username**: `presto_user` (or any name you want)
   - **Password**: Click **"Autogenerate Secure Password"** OR create your own
   - **⚠️ IMPORTANT**: Copy and save the password!
5. Under **"Database User Privileges"**: Select **"Atlas admin"** (or "Read and write to any database")
6. Click **"Add User"**

### Step 3: Update Network Access
1. Click **"Network Access"** (left sidebar)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (adds 0.0.0.0/0)
4. Click **"Confirm"**

### Step 4: Get New Connection String
1. Go back to **"Database"** → Click **"Connect"** on your cluster
2. Choose **"Connect your application"**
3. Copy the connection string (looks like):
   ```
   mongodb+srv://<username>:<password>@cluster0.r7b45cf.mongodb.net/?retryWrites=true&w=majority
   ```
4. Replace:
   - `<username>` with your NEW username (e.g., `presto_user`)
   - `<password>` with your NEW password
   - Add `/presto` before the `?` to specify database name

**Final format:**
```
mongodb+srv://presto_user:YourNewPassword@cluster0.r7b45cf.mongodb.net/presto?retryWrites=true&w=majority
```

### Step 5: Update .env File
Replace the MONGODB_URI line in `.env` with your new connection string.

### Step 6: Test Connection
Run: `node test-server.js`

You should see: `✅ MongoDB Connected Successfully!`

---

## 🔄 Alternative: Reset Existing User Password

If you want to keep using `AlbertJames`:

1. Go to **"Database Access"**
2. Find user `AlbertJames`
3. Click the **pencil icon** (Edit)
4. Click **"Edit Password"**
5. Enter new password and save
6. Update `.env` file with new password

---

## 📝 After Fixing

Once connection works:
1. Run: `npm start`
2. You should see: `✅ Connected to MongoDB`
3. Open `index.html` in browser
4. Try signing up - it should work!



