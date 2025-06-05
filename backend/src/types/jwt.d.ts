import { JwtPayload } from 'jsonwebtoken'

export interface Decoded extends JwtPayload {
  firstName: string,
  lastName: string,
  email: string
}