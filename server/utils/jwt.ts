import jwt, { JwtPayload, Secret } from "jsonwebtoken"

const SECRET: Secret = process.env.JWT_SECRET || "super-secret"

export function signJwt(
  payload: object,
  expiresIn: string | number = "1d"
): string {
  return jwt.sign(payload, SECRET, { expiresIn })
}

export function verifyJwt(token: string): JwtPayload | string | null {
  try {
    return jwt.verify(token, SECRET)
  } catch {
    return null
  }
}
