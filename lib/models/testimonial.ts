import mongoose from 'mongoose'

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  position: String,
  company: String,
  content: {
    type: String,
    required: true
  },
  image: String,
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', testimonialSchema)

