import { JwtPayload } from 'jsonwebtoken'

export interface Decoded extends JwtPayload {
  _id: string,
  firstName: string,
  lastName: string,
  email: string
}