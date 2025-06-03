import { z } from 'zod'
import dotenv from 'dotenv'

const envSchema = z.object({
  DATABASE_URI: z.string().url(),
  PORT: z.string().transform(Number).default('3000')
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.log('Invalid environment variables')
  process.exit(1)
}

const env = _env.data

export default env