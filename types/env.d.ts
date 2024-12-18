declare global {
    namespace NodeJS {
      interface ProcessEnv {
        MONGODB_URI: string
        JWT_SECRET_KEY: string
        CLOUDINARY_CLOUD_NAME: string
        CLOUDINARY_API_KEY: string
        CLOUDINARY_API_SECRET: string
        CLOUDINARY_FOLDER_NAME: string
      }
    }
  }
  
  export {}
  
  