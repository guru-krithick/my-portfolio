import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { Testimonial } from '@/lib/models/testimonial'

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase()
    const deletedTestimonial = await Testimonial.findByIdAndDelete(params.id)
    if (!deletedTestimonial) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 })
    }
    return NextResponse.json({ message: 'Testimonial deleted successfully' })
  } catch (error) {
    console.error('Error deleting testimonial:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

