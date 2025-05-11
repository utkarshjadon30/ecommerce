import jwt, { Secret } from "jsonwebtoken"
const SECRET: Secret = process.env.JWT_SECRET || "super-secret"

export default defineEventHandler(async (event) => {
  console.log(getRequestURL(event).pathname)
  const pathname = getRequestURL(event).pathname

  if (!pathname.startsWith("/api/")) {
    return
  }

  if (!getRequestURL(event).pathname.startsWith("/api/auth")) {
    const { authorization } = getRequestHeaders(event)
    console.log(authorization, "authorization")
    if (!authorization) {
      throw createError({
        statusCode: 401,
        message: "Token not found",
      })
    }
    try {
      const token = authorization.split(" ")[1]

      const payload: any = jwt.verify(token, SECRET)

      console.log(payload, "payload")

      if (!payload) {
        throw new Error("GroupCode not found in token")
      }

      event.context.auth = payload
    } catch (err) {
      throw createError({
        statusCode: 401,
        message: "Unauthorized-" + err,
      })
    }
  }
})
