import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import { connectToDatabase } from '@/lib/mongodb'
import { Admin } from '@/lib/models/admin'

export async function POST(req: NextRequest) {
  try {
    const { email, password, username } = await req.json()
    
    await connectToDatabase()
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email })
    if (existingAdmin) {
      return new NextResponse(JSON.stringify({ success: false, message: 'Admin already exists' }), {
        status: 400
      })
    }
    
    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);
    
    // Create new admin
    const newAdmin = new Admin({
      email,
      password: hashedPassword,
      username: username || email // Use email as username if not provided
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

