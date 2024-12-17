import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectToDatabase } from '@/lib/mongodb'
import { Admin } from '@/lib/models/admin'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()
    
    await connectToDatabase()
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email })
    if (existingAdmin) {
      return new NextResponse(JSON.stringify({ success: false, message: 'Admin already exists' }), {
        status: 400
      })
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    
    // Create new admin
    const newAdmin = new Admin({
      email,
      password: hashedPassword
    })
    
    await newAdmin.save()

    return new NextResponse(JSON.stringify({ success: true, message: 'Admin created successfully' }), {
      status: 201
    })
  } catch (error) {
    console.error('Admin signup error:', error)
    return new NextResponse(JSON.stringify({ success: false, message: 'Internal server error' }), {
      status: 500
    })
  }
}

