import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { Certification } from '@/lib/models/certification'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase()
    const certification = await Certification.findById(params.id)
    if (!certification) {
      return NextResponse.json({ error: 'Certification not found' }, { status: 404 })
    }
    return NextResponse.json(certification)
  } catch (error) {
    console.error('Error fetching certification:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase()
    const data = await req.json()
    const updatedCertification = await Certification.findByIdAndUpdate(params.id, data, { new: true })
    if (!updatedCertification) {
      return NextResponse.json({ error: 'Certification not found' }, { status: 404 })
    }
    return NextResponse.json(updatedCertification)
  } catch (error) {
    console.error('Error updating certification:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase()
    const deletedCertification = await Certification.findByIdAndDelete(params.id)
    if (!deletedCertification) {
      return NextResponse.json({ error: 'Certification not found' }, { status: 404 })
    }
    return NextResponse.json({ message: 'Certification deleted successfully' })
  } catch (error) {
    console.error('Error deleting certification:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

