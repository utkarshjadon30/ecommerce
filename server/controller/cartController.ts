// server/controller/cartController.ts
import prisma from "~/server/utils/prismaInstance"

export const findAllCarts = async () => {
  try {
    return await prisma.cart.findMany()
  } catch (err) {
    console.error("Find all carts error:", err)
    return []
  }
}

export const findSingleCart = async (id: string) => {
  try {
    return await prisma.cart.findUnique({ where: { id } })
  } catch (err) {
    console.error("Find single cart error:", err)
    return null
  }
}

export const createCart = async (data: { userId: string }) => {
  try {
    return await prisma.cart.create({
      data: {
        userId: data.userId,
      },
    })
  } catch (err) {
    console.error("Create cart error:", err)
    throw new Error("Error creating cart")
  }
}

export const deleteCart = async (id: string) => {
  try {
    return await prisma.cart.delete({
      where: { id },
    })
  } catch (err) {
    console.error("Delete cart error:", err)
    return { error: "Could not delete cart" }
  }
}
