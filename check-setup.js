// Quick setup checker
console.log('🔍 Checking Presto Restaurant Setup...\n');

// Check Node.js version
const nodeVersion = process.version;
console.log(`✅ Node.js version: ${nodeVersion}`);

// Check if dependencies are installed
try {
    require('express');
    require('mongoose');
    require('cors');
    require('bcryptjs');
    require('dotenv');
    console.log('✅ All dependencies installed');
} catch (error) {
    console.log('❌ Missing dependencies. Run: npm install');
    process.exit(1);
}

// Check .env file
const fs = require('fs');
if (fs.existsSync('.env')) {
    console.log('✅ .env file exists');
    require('dotenv').config();
    if (process.env.MONGODB_URI) {
        console.log(`✅ MONGODB_URI configured: ${process.env.MONGODB_URI.replace(/\/\/.*@/, '//***:***@')}`);
    } else {
        console.log('⚠️  MONGODB_URI not set in .env');
    }
} else {
    console.log('⚠️  .env file not found');
    console.log('💡 Creating default .env file...');
    fs.writeFileSync('.env', 'MONGODB_URI=mongodb://localhost:27017/presto\nPORT=3000\n');
    console.log('✅ .env file created');
}

console.log('\n✅ Setup check complete!');
console.log('🚀 Run "npm start" to start the server\n');



