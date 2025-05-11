// server/api/users.ts

import {
  findAllUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controller/userController"

export default defineEventHandler(async (event) => {
  const method = event.method

  if (method === "GET") {
    const users = await findAllUser()
    console.log(users)
    return { data: users }
  }

  if (method === "POST") {
    const body = await readBody(event)
    console.log(body)
    const newUser = await createUser(body)
    return { data: newUser }
  }

  if (method === "PUT") {
    const body = await readBody(event)
    const updatedUser = await updateUser(body)
    return { data: updatedUser }
  }

  if (method === "DELETE") {
    const body = await readBody(event)
    const deletedUser = await deleteUser(body.id)
    return { data: deletedUser }
  }

  return { error: "Method not allowed" }
})
