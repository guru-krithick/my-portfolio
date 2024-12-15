import mongoose from 'mongoose'

const resumeSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  version: {
    type: Number,
    default: 1
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
})

export const Resume = mongoose.models.Resume || mongoose.model('Resume', resumeSchema)

