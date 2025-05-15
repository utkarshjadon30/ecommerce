// server/controller/cartController.ts
import prisma from "~/server/utils/prismaInstance"

export const findAllOrders = async () => {
  try {
    return await prisma.order.findMany()
  } catch (err) {
    console.error("Find all orders error:", err)
    return []
  }
}

export const findSingleorder = async (id: string) => {
  try {
    return await prisma.order.findUnique({ where: { id } })
  } catch (err) {
    console.error("Find single order error:", err)
    return null
  }
}

export const findUserOrders = async (userId: string) => {
  try {
    return await prisma.order.findMany({ where: { userId } })
  } catch (err) {
    console.error("Find User orders error:", err)
    return null
  }
}

export const createOrder = async (data: { userId: string; status: string }) => {
  try {
    return await prisma.order.create({
      data: {
        userId: data.userId,
        status: data.status,
      },
    })
  } catch (err) {
    console.error("Create order error:", err)
    throw new Error("Error creating order")
  }
}

export const updateorderStatus = async (data: {
  id: string
  status: string
}) => {
  try {
    return await prisma.order.update({
      where: { id: data.id },
      data: {
        status: data.status,
      },
    })
  } catch (err) {
    console.error("Update order error:", err)
    return { error: "Could not update order status" }
  }
}

export const deleteorder = async (id: string) => {
  try {
    return await prisma.order.delete({
      where: { id },
    })
  } catch (err) {
    console.error("Delete cart error:", err)
    return { error: "Could not delete cart" }
  }
}
