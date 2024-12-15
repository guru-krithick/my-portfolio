import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  description: String,
  image: {
    type: String,
    required: true
  },
  githubUrl: String,
  liveUrl: String,
  technologies: [String],
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export const Project = mongoose.models.Project || mongoose.model('Project', projectSchema)

