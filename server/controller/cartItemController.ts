// server/controller/cartItemController.ts
import prisma from "~/server/utils/prismaInstance"

export const findAllCartItems = async () => {
  try {
    return await prisma.cartItem.findMany()
  } catch (err) {
    console.error("Find all cart items error:", err)
    return []
  }
}

export const findCartItem = async (cartId: string) => {
  try {
    return await prisma.cartItem.findMany({ where: { cartId } })
  } catch (err) {
    console.error("Find single cart item error:", err)
    return null
  }
}

export const createCartItem = async (data: {
  cartId: string
  productId: string
  quantity: number
}) => {
  try {
    return await prisma.cartItem.create({
      data: {
        cartId: data.cartId,
        productId: data.productId,
        quantity: data.quantity,
      },
    })
  } catch (err) {
    console.error("Create cart item error:", err)
    throw new Error("Error creating cart item")
  }
}

export const updateCartItem = async (data: {
  cartId: string
  productId: string
  quantity?: number
}) => {
  try {
    return await prisma.cartItem.update({
      where: {
        cartId_productId: {
          cartId: data.cartId,
          productId: data.productId,
        },
      },
      data: {
        quantity: data.quantity,
      },
    })
  } catch (err) {
    console.error("Update cart item error:", err)
    return { error: "Could not update cart item" }
  }
}

export const deleteCartItem = async (data: {
  cartId: string
  productId: string
}) => {
  try {
    return await prisma.cartItem.delete({
      where: {
        cartId_productId: {
          cartId: data.cartId,
          productId: data.productId,
        },
      },
    })
  } catch (err) {
    console.error("Delete cart item error:", err)
    return { error: "Could not delete cart item" }
  }
}
