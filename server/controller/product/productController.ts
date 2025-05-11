// server/controller/userController.ts

import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

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
  discription: string
  price: number
  stock: number
}) => {
  try {
    return await prisma.product.create({
      data: {
        name: data.name,
        discription: data.discription,
        price: data.price,
        stock: data.stock,
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
  discription?: string
  price?: number
  stock?: number
}) => {
  try {
    return await prisma.product.update({
      where: { productId: data.productId },
      data: {
        name: data.name,
        discription: data.discription,
        price: data.price,
        stock: data.stock,
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
