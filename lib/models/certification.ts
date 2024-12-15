import mongoose from 'mongoose'

const certificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  issuer: {
    type: String,
    required: true
  },
  issueDate: {
    type: Date,
    required: true
  },
  expiryDate: Date,
  credentialUrl: String,
  credentialId: String,
  image: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export const Certification = mongoose.models.Certification || mongoose.model('Certification', certificationSchema)

