
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

// Manual .env parsing
const envPath = path.resolve(process.cwd(), 'src/data/.env');
let uri = '';

try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/MONGODB_URI=(.*)/);
    if (match && match[1]) {
        uri = match[1].trim();
    }
} catch (err) {
    console.error('Error reading .env file:', err.message);
}

console.log('Testing MongoDB connection...');

if (!uri) {
    console.error('Error: MONGODB_URI not found in', envPath);
    process.exit(1);
}

// Mask password for safety in logs
const maskedUri = uri.replace(/:([^:@]+)@/, ':****@');
console.log('Using URI:', maskedUri);

async function testConnection() {
    try {
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
        console.log('✅ GENUINELY CONNECTED!');
        console.log('Database Name:', mongoose.connection.name);
        console.log('State:', mongoose.connection.readyState === 1 ? 'Connected' : 'Connecting');
        await mongoose.disconnect();
    } catch (error) {
        console.error('❌ Connection failed:', error.message);
    }
}

testConnection();
