import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { Resume } from '@/lib/models/resume'

export async function GET() {
  try {
    await connectToDatabase()
    const resume = await Resume.findOne()
    if (!resume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 })
    }
    return NextResponse.json(resume)
  } catch (error) {
    console.error('Error fetching resume:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase()
    const data = await req.json()
    const newResume = new Resume(data)
    const savedResume = await newResume.save()
    return NextResponse.json(savedResume, { status: 201 })
  } catch (error) {
    console.error('Error creating resume:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

