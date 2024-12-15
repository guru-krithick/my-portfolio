import { NextResponse } from 'next/server'
import { sign } from 'jsonwebtoken'
import { serialize } from 'cookie'
import { connectToDatabase } from '@/lib/mongodb'
import { Admin } from '@/lib/models/admin'

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key'

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json()
    
    await connectToDatabase()
    
    const admin = await Admin.findOne({ username })
    
    if (!admin) {
      return new NextResponse(JSON.stringify({ success: false, message: 'Invalid credentials' }), {
        status: 401
      })
    }
    
    const isValidPassword = await admin.comparePassword(password)
    
    if (!isValidPassword) {
      return new NextResponse(JSON.stringify({ success: false, message: 'Invalid credentials' }), {
        status: 401
      })
    }

    const token = sign(
      { username: admin.username, id: admin._id },
      SECRET_KEY,
      { expiresIn: '1h' }
    )

    const serialized = serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600,
      path: '/'
    })

    return new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Set-Cookie': serialized }
    })
  } catch (error) {
    console.error('Authentication error:', error)
    return new NextResponse(JSON.stringify({ success: false, message: 'Internal server error' }), {
      status: 500
    })
  }
}

