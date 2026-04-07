const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

const seedAdmin = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const adminExists = await User.findOne({ email: 'admin@sportshub.com' });
    
    if (adminExists) {
      console.log('✓ Admin already exists');
      console.log('Demo Admin Credentials:');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('Email: admin@sportshub.com');
      console.log('Password: password123');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    } else {
      // Create admin user
      const admin = await User.create({
        name: 'Super Admin',
        email: 'admin@sportshub.com',
        password: 'password123',
        role: 'admin',
        status: 'approved'
      });

      console.log('✓ Admin user created successfully!');
      console.log('Demo Admin Credentials:');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('Email: admin@sportshub.com');
      console.log('Password: password123');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error.message);
    process.exit(1);
  }
};

seedAdmin();
