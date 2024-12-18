import mongoose from 'mongoose'
// import bcrypt from 'bcryptjs'

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// Hash password before saving


export const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema)

