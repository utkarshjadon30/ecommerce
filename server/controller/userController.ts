// server/controller/userController.ts

import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const findAllUser = async () => {
  try {
    return await prisma.user.findMany()
  } catch (err) {
    console.error("Find all users error:", err)
    return []
  }
}

export const findSingleUser = async (email: string) => {
  try {
    return await prisma.user.findUnique({ where: { email } })
  } catch (err) {
    console.error("Find single users error:", err)
    return null
  }
}

export const createUser = async (data: { email: string; password: string }) => {
  try {
    return await prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
      },
    })
  } catch (err) {
    console.error("Create user error:", err)
    throw new Error("Error creating user")
  }
}

export const updateUser = async (data: { userID: string; email?: string }) => {
  try {
    return await prisma.user.update({
      where: { userID: data.userID },
      data: {
        email: data.email,
      },
    })
  } catch (err) {
    console.error("Update user error:", err)
    return { error: "Could not update user" }
  }
}

export const deleteUser = async (userID: string) => {
  try {
    return await prisma.user.delete({
      where: { userID },
    })
  } catch (err) {
    console.error("Delete user error:", err)
    return { error: "Could not delete user" }
  }
}
