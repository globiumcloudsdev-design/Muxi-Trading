require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('❌ Please define MONGODB_URI environment variable');
}

// User Schema
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    default: null,
  },
  address: {
    street: { type: String, default: null },
    city: { type: String, default: null },
    state: { type: String, default: null },
    pincode: { type: String, default: null },
    country: { type: String, default: 'India' },
  },
  role: {
    type: String,
    enum: ['customer', 'admin'],
    default: 'customer',
  },
  cart: [
    {
      itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
      quantity: { type: Number, default: 1 },
    },
  ],
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
    },
  ],
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);

async function seedAdmin() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    });
    console.log('✅ MongoDB connected successfully!');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@muxitrading.com' });
    
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists!');
      console.log('   Email:', existingAdmin.email);
      console.log('   Role:', existingAdmin.role);
      
      // Delete and recreate
      console.log('🔄 Deleting existing admin and creating new one...');
      await User.deleteOne({ email: 'admin@muxitrading.com' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash('admin@123', 10);

    // Create admin user
    const admin = await User.create({
      fullName: 'Admin User',
      email: 'admin@muxitrading.com',
      password: hashedPassword,
      phone: '+91-9999999999',
      role: 'admin',
      address: {
        street: '123 Admin Street',
        city: 'Admin City',
        state: 'Admin State',
        pincode: '000000',
        country: 'India',
      },
    });

    console.log('✅ Admin user created successfully!');
    console.log('📋 Admin Details:');
    console.log('   ID:', admin._id);
    console.log('   Name:', admin.fullName);
    console.log('   Email:', admin.email);
    console.log('   Role:', admin.role);
    console.log('   Phone:', admin.phone);

    await mongoose.connection.close();
    console.log('✅ Database connection closed');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error during seeding:', error.message);
    if (error.code === 11000) {
      console.error('   Duplicate key error. The admin email might already exist.');
    }
    process.exit(1);
  }
}

seedAdmin();
