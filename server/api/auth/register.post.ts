import bcrypt from "bcrypt"
import { createUser, findSingleUser } from "~/server/controller/userController"

export default defineEventHandler(async (event) => {
  const { email, password, firstName, lastName } = await readBody(event)

  const existing = await findSingleUser(email)
  if (existing)
    throw createError({ statusCode: 400, statusMessage: "User exists" })

  const hashed = await bcrypt.hash(password, 10)
  const user = await createUser({
    email,
    firstName,
    lastName,
    password: hashed,
  })

  return {
    id: user.userID,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  }
})
