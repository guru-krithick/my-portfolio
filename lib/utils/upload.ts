import { type File } from 'formidable'
import cloudinary from '../cloudinary'

export async function uploadToCloudinary(file: File, folder?: string) {
  try {
    const result = await cloudinary.uploader.upload(file.filepath, {
      folder: folder || process.env.CLOUDINARY_FOLDER_NAME
    })
    return result.secure_url
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error)
    throw error
  }
}

export async function deleteFromCloudinary(url: string) {
  try {
    const publicId = url.split('/').pop()?.split('.')[0]
    if (publicId) {
      await cloudinary.uploader.destroy(publicId)
    }
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error)
    throw error
  }
}

