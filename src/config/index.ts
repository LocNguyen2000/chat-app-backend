import * as dotenv from 'dotenv'

dotenv.config({ path: '../.env.local' })

export default {
  port: process.env.PORT,
  secretKey: process.env.SECRET_KEY,
  psUsername: process.env.PS_USERNAME,
  psPassword: process.env.PS_PASSWORD,
  psDBName: process.env.PS_DATABASE_NAME,
  psHost: process.env.PS_HOST,
  psPort: process.env.PS_PORT,
}
