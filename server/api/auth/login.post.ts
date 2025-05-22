import bcrypt from "bcrypt"
import { signJwt } from "~/server/utils/jwt"
import { findSingleUser } from "~/server/controller/userController"

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)

  const user = await findSingleUser(email)
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw createError({ statusCode: 401, statusMessage: "Invalid credentials" })
  }

  const { token, expiresAt } = signJwt({
    id: user.userID,
    email: user.email,
    role: user.role,
  })
  // const decoded: any = jwt.decode(token)

  return {
    token: {
      token,
      expiresAt,
    },
    user: {
      id: user.userID,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  }
})
