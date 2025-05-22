import jwt, { Secret } from "jsonwebtoken"
const SECRET: Secret = process.env.JWT_SECRET || "super-secret"

export default defineEventHandler(async (event) => {
  const pathname = getRequestURL(event).pathname

  if (!pathname.startsWith("/api/")) {
    return
  }

  if (!getRequestURL(event).pathname.startsWith("/api/auth")) {
    const { authorization } = getRequestHeaders(event)

    if (!authorization) {
      throw createError({
        statusCode: 401,
        message: "Token not found",
      })
    }
    try {
      const token = authorization.split(" ")[1]

      const payload: any = jwt.verify(token, SECRET)

      if (!payload) {
        throw new Error("GroupCode not found in token")
      }

      const userRole = payload.role

      if (pathname.startsWith("/api/admin") && userRole !== "ADMIN") {
        throw createError({
          statusCode: 403,
          message: "Access denied: Admins only",
        })
      }

      // if (pathname.startsWith("/api/user") && userRole !== "user" && userRole !== "admin") {
      //   throw createError({
      //     statusCode: 403,
      //     message: "Access denied: Users only",
      //   })
      // }

      event.context.auth = payload
    } catch (err) {
      throw createError({
        statusCode: 401,
        message: "Unauthorized - " + err,
      })
    }
  }
})
