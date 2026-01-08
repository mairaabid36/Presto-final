const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.static('.')); // Serve static files from current directory
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
    res.json({ message: 'Presto Frontend Server is running!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

