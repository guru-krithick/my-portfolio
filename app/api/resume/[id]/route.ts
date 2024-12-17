import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { Resume } from '@/lib/models/resume'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase()
    const data = await req.json()
    const updatedResume = await Resume.findByIdAndUpdate(params.id, data, { new: true })
    if (!updatedResume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 })
    }
    return NextResponse.json(updatedResume)
  } catch (error) {
    console.error('Error updating resume:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

