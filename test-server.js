// Quick server test
const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/presto';

console.log('🔍 Testing MongoDB Connection...');
console.log('Connection String:', MONGODB_URI.replace(/:[^:@]+@/, ':****@'));

mongoose.connect(MONGODB_URI)
.then(() => {
    console.log('✅ MongoDB Connected Successfully!');
    process.exit(0);
})
.catch(err => {
    console.error('❌ MongoDB Connection Failed:');
    console.error('Error:', err.message);
    console.log('\n💡 Common fixes:');
    console.log('1. Check your MongoDB Atlas Network Access (add 0.0.0.0/0)');
    console.log('2. Verify username/password in .env file');
    console.log('3. Make sure cluster is running (not paused)');
    process.exit(1);
});



