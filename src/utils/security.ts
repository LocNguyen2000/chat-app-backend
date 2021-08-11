import jwt from 'jsonwebtoken'
import config from '../config'
import { userInterface } from '../types/userAdapter'
import bcrypt from 'bcrypt'

export const jwtGenerate = (userInfo: userInterface) => {
  const payload = {
    data: userInfo,
  }
  return jwt.sign(payload, config.secretKey as string, { expiresIn: 60 * 60 })
}

export const comparePassword = async (loginPass: string, userInfo: userInterface) => {
  const isPassword: boolean = await bcrypt.compare(loginPass, userInfo.password)
  return isPassword
}

export const encryptPassword = async (password: string) => {
  // generate salt for bcrypt randomness
  const saltRound = 10
  const salt = await bcrypt.genSalt(saltRound)

  // encrypt pass with bcrypt
  const encrypted = await bcrypt.hash(password, salt)

  return encrypted
}