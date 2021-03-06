import { JwtPayload } from 'jsonwebtoken'

export interface userInterface {
  id: number
  name: string
  email: string
  password: string
}

export interface PayloadWithData extends JwtPayload {
  data: userInterface
}

export interface registerInterface {
  name: string
  email: string
  password: string
}

export interface loginInterface {
  email: string
  password: string
}
