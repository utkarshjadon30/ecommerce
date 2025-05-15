// server/controller/cartItemController.ts
import prisma from "~/server/utils/prismaInstance"

export const createOrderItem = async (data: {
  orderId: string
  productId: string
  quantity: number
}) => {
  try {
    return await prisma.orderItem.create({
      data: {
        orderId: data.orderId,
        productId: data.productId,
        quantity: data.quantity,
      },
    })
  } catch (err) {
    console.error("Create order item error:", err)
    throw new Error("Error creating order item")
  }
}
