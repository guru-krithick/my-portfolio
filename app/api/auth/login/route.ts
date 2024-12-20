import { NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';
import { connectToDatabase } from '@/lib/mongodb';
import { Admin } from '@/lib/models/admin';
import bcryptjs from 'bcryptjs';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Check if the input is valid
    if (!email || !password) {
      return new NextResponse(
        JSON.stringify({ success: false, message: 'Email and password are required' }),
        { status: 400 }
      );
    }

    // Connect to the database
    await connectToDatabase();

    // Find admin by email
    const admin = await Admin.findOne({ email });
    console.log(admin)
    if (!admin) {
      return new NextResponse(
        JSON.stringify({ success: false, message: 'Invalid email or password' }),
        { status: 401 }
      );
    }

    // Compare password
          // const salt = await bcrypt.genSalt(10)
          const hashedPassword = '$2a$10$8B0DGFEnrp5X/LMDjsZBFuUM3.gkyZkbSUU9fQAvhpJ2B/W5sGFe.';
const plainPassword = 'guru1307';

bcryptjs.compare(plainPassword, hashedPassword).then((isValid) => {
  console.log('Password Match:', isValid); // Should log `true` if correct
});
        const isPasswordValid = await bcryptjs.compare(password, admin.password);
        // console.log(bcrypt.compare(password, admin.password))
        console.log(isPasswordValid)
        console.log(admin.password)
        console.log(password)
    if (!isPasswordValid) {
      return new NextResponse(
        JSON.stringify({ success: false, message: 'Invalid email or password' }),
        { status: 402 }
      );
    }

    // Generate JWT token
    const token = sign({ email: admin.email, id: admin._id }, SECRET_KEY, { expiresIn: '1h' });

    // Set cookie
    const serialized = serialize('adminUserToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600,
      path: '/',
    });

    return new NextResponse(
      JSON.stringify({ success: true, message: 'Login successful' }),
      {
        status: 200,
        headers: { 'Set-Cookie': serialized },
      }
    );
  } catch (error) {
    console.log('Authentication error:', error);

    return new NextResponse(
      JSON.stringify({ success: false, message: 'Internal server error' }),
      { status: 500 }
    );
  }
}
