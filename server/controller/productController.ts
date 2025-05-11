// server/controller/userController.ts
import prisma from "~/server/utils/prismaInstance"

export const findAllProduct = async () => {
  try {
    return await prisma.product.findMany()
  } catch (err) {
    console.error("Find all product error:", err)
    return []
  }
}

export const findSingleProduct = async (productId: string) => {
  try {
    return await prisma.product.findUnique({ where: { productId } })
  } catch (err) {
    console.error("Find single product error:", err)
    return null
  }
}

export const createProduct = async (data: {
  name: string
  description: string
  price: number
  stock: number
  categoryId: string
}) => {
  try {
    return await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        categoryId: data.categoryId,
      },
    })
  } catch (err) {
    console.error("Create product error:", err)
    throw new Error("Error creating product")
  }
}

export const updateProduct = async (data: {
  productId: string
  name?: string
  description?: string
  price?: number
  stock?: number
  categoryId?: string
}) => {
  try {
    return await prisma.product.update({
      where: { productId: data.productId },
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        categoryId: data.categoryId,
      },
    })
  } catch (err) {
    console.error("Update user error:", err)
    return { error: "Could not update product" }
  }
}

export const deleteProduct = async (productId: string) => {
  try {
    return await prisma.product.delete({
      where: { productId },
    })
  } catch (err) {
    console.error("Delete product error:", err)
    return { error: "Could not delete product" }
  }
}
