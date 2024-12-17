import { NextResponse } from 'next/server'
import { serialize } from 'cookie'

export async function POST() {
  const serialized = serialize('adminUserToken', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/'
  })

  return new NextResponse(JSON.stringify({ success: true, message: 'Logged out successfully' }), {
    status: 200,
    headers: { 'Set-Cookie': serialized }
  })
}

