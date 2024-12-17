import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { Testimonial } from '@/lib/models/testimonial'

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase()
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '8')

    const skip = (page - 1) * limit

    const testimonials = await Testimonial.find()
      .skip(skip)
      .limit(limit)

    const totalTestimonials = await Testimonial.countDocuments()
    const totalPages = Math.ceil(totalTestimonials / limit)

    return NextResponse.json({ testimonials, totalPages })
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase()
    const data = await req.json()
    const newTestimonial = new Testimonial(data)
    const savedTestimonial = await newTestimonial.save()
    return NextResponse.json(savedTestimonial, { status: 201 })
  } catch (error) {
    console.error('Error creating testimonial:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

