import jwt from "jsonwebtoken"

const SECRET = process.env.JWT_SECRET || "super-secret"

export function signJwt(
  payload: object,
  expiresIn: string | number = "1d"
): { token: string; expiresAt: number } {
  // Calculate expiration timestamp manually
  const now = Math.floor(Date.now() / 1000) // current time in seconds
  let exp: number

  if (typeof expiresIn === "string") {
    // Convert string time like "15m", "1d", etc. to seconds
    const duration = {
      s: 1,
      m: 60,
      h: 3600,
      d: 86400,
    }
    const match = expiresIn.match(/^(\d+)([smhd])$/)
    if (match) {
      const [_, value, unit] = match
      exp = now + parseInt(value) * duration[unit as keyof typeof duration]
    } else {
      throw new Error("Invalid expiresIn format")
    }
  } else {
    exp = now + expiresIn
  }

  const token = jwt.sign(payload, SECRET, { expiresIn })

  return {
    token,
    expiresAt: exp, // in seconds since epoch
  }
}

export function verifyJwt(token: string): any {
  try {
    const decoded = jwt.verify(token, SECRET)
    return decoded
  } catch (err) {
    return null
  }
}
