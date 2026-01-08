# 🔧 Fix MongoDB Authentication Error

## Problem
Error: `bad auth : authentication failed`

## Solution Steps

### Step 1: Check MongoDB Atlas Database User
1. Go to: https://cloud.mongodb.com/
2. Login to your account
3. Click on your cluster
4. Go to **"Database Access"** (left sidebar)
5. Check if user `AlbertJames` exists
6. If not, create a new database user:
   - Click **"Add New Database User"**
   - Choose **"Password"** authentication
   - Username: `AlbertJames` (or create new one)
   - Password: Create a new password (save it!)
   - Click **"Add User"**

### Step 2: URL Encode Password
If your password has special characters (`@`, `#`, `%`, `&`, etc.), they need to be URL encoded:

**Special Characters Encoding:**
- `@` → `%40`
- `#` → `%23`
- `%` → `%25`
- `&` → `%26`
- `+` → `%2B`
- `/` → `%2F`
- `=` → `%3D`
- `?` → `%3F`

### Step 3: Update .env File
Your password `Pq8EkR2mZM8MGZLH` looks safe, but let's verify:

1. Open `.env` file
2. Make sure the connection string is correct:
   ```
   MONGODB_URI=mongodb+srv://AlbertJames:Pq8EkR2mZM8MGZLH@cluster0.r7b45cf.mongodb.net/presto?retryWrites=true&w=majority
   ```

### Step 4: Check Network Access
1. Go to MongoDB Atlas
2. Click **"Network Access"** (left sidebar)
3. Make sure you have an entry allowing `0.0.0.0/0` (all IPs)
4. If not, click **"Add IP Address"** → **"Allow Access from Anywhere"**

### Step 5: Test Connection Again
Run: `node test-server.js`

If still failing, try creating a NEW database user with a simpler password.



