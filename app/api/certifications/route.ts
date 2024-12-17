import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { Certification } from '@/lib/models/certification'

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase()
    const { searchParams } = new URL(req.url)
    const search = searchParams.get('search') || ''
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '8')

    const query = search ? { name: { $regex: search, $options: 'i' } } : {}
    const skip = (page - 1) * limit

    const certifications = await Certification.aggregate([
      { $match: query },
      {
        $addFields: {
          sortOrder: {
            $switch: {
              branches: [
                { case: { $eq: ["$level", "advanced"] }, then: 1 },
                { case: { $eq: ["$level", "intermediate"] }, then: 2 },
                { case: { $eq: ["$level", "basic"] }, then: 3 },
              ],
              default: 4,
            },
          },
        },
      },
      { $sort: { sortOrder: 1 } },
      { $skip: skip },
      { $limit: limit },
    ])

    const totalCertifications = await Certification.countDocuments(query)
    const totalPages = Math.ceil(totalCertifications / limit)

    return NextResponse.json({ certifications, totalPages })
  } catch (error) {
    console.error('Error fetching certifications:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase()
    const data = await req.json()
    const newCertification = new Certification(data)
    const savedCertification = await newCertification.save()
    return NextResponse.json(savedCertification, { status: 201 })
  } catch (error) {
    console.error('Error creating certification:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

