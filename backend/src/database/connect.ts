import mongoose from 'mongoose'

import env from '../types/env'

const uri = env.DATABASE_URI

async function connectDB() {
  try {
    await mongoose.connect(uri)
    console.log('Database connection successful')
  } catch(err) {
    if (err instanceof Error) {
      console.error('Database connection failed', err.message)
      process.exit(1)
    }
  }
}

export default connectDB