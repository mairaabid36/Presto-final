# Presto Restaurant - MongoDB Backend Setup

## Prerequisites

1. **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
2. **MongoDB** - Choose one:
   - **Local MongoDB**: [Download](https://www.mongodb.com/try/download/community)
   - **MongoDB Atlas** (Cloud): [Sign up](https://www.mongodb.com/cloud/atlas) (Free tier available)

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure MongoDB

#### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Create `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/presto
PORT=3000
```

#### Option B: MongoDB Atlas (Cloud)
1. Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string
4. Create `.env` file:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/presto
PORT=3000
```

### 3. Start the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:3000`

## API Endpoints

### User Endpoints
- `POST /api/users/signup` - Create new user
- `POST /api/users/login` - User login
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id/payment-method` - Update payment method

### Order Endpoints
- `POST /api/orders` - Create new order
- `GET /api/orders/user/:userId` - Get user's orders
- `GET /api/orders` - Get all orders (admin)

### Activity Endpoints
- `GET /api/activities/user/:userId` - Get user activities
- `GET /api/activities/user/:userId/last-login` - Get last login

## Frontend Configuration

The frontend (`script.js`) is already configured to use the API. Make sure:

1. The backend server is running on `http://localhost:3000`
2. CORS is enabled (already configured in server.js)
3. Update `API_BASE_URL` in `script.js` if using a different port

## Testing

Test the API using:
- Browser console
- Postman
- curl commands

Example:
```bash
curl http://localhost:3000/
```

## Troubleshooting

1. **MongoDB connection error**: Check if MongoDB is running and connection string is correct
2. **Port already in use**: Change PORT in `.env` file
3. **CORS errors**: Ensure backend is running and CORS is enabled



