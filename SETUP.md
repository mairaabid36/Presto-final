# MongoDB Setup Guide for Presto Restaurant

## Quick Start

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Set Up MongoDB

#### Option A: Local MongoDB
1. Download MongoDB from https://www.mongodb.com/try/download/community
2. Install and start MongoDB service
3. Create `.env` file in project root:
```env
MONGODB_URI=mongodb://localhost:27017/presto
PORT=3000
```

#### Option B: MongoDB Atlas (Cloud - Recommended)
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create a free cluster
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database password
7. Create `.env` file:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/presto
PORT=3000
```

### Step 3: Start the Server
```bash
# Development mode (auto-reload on changes)
npm run dev

# Production mode
npm start
```

### Step 4: Open Your Website
Open `index.html` in your browser. The frontend will automatically connect to the API.

## Verify It's Working

1. Check server is running: Open http://localhost:3000 - should see "Presto Restaurant API is running!"
2. Try signing up a new user on your website
3. Check MongoDB - you should see data in the `users` collection

## Troubleshooting

### "Cannot connect to MongoDB"
- Check MongoDB is running (local) or cluster is active (Atlas)
- Verify connection string in `.env` file
- Check firewall settings (Atlas)

### "Port 3000 already in use"
- Change PORT in `.env` file to another port (e.g., 3001)
- Update `API_BASE_URL` in `script.js` to match

### "CORS errors"
- Make sure backend server is running
- Check browser console for specific error messages

## Data Storage

All data is now stored in MongoDB:
- **Users** → `users` collection
- **Orders** → `orders` collection  
- **Activities** → `activities` collection

You can view data using:
- MongoDB Compass (GUI tool)
- MongoDB Atlas web interface
- MongoDB shell commands



