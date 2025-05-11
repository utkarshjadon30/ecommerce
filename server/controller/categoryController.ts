// server/controller/categoryController.ts
import prisma from "~/server/utils/prismaInstance"

export const findAllCategories = async () => {
  try {
    return await prisma.category.findMany()
  } catch (err) {
    console.error("Find all categories error:", err)
    return []
  }
}

export const findSingleCategory = async (categoryId: string) => {
  try {
    return await prisma.category.findUnique({ where: { categoryId } })
  } catch (err) {
    console.error("Find single category error:", err)
    return null
  }
}

export const createCategory = async (data: { name: string }) => {
  try {
    return await prisma.category.create({
      data: {
        name: data.name,
      },
    })
  } catch (err) {
    console.error("Create category error:", err)
    throw new Error("Error creating category")
  }
}

export const updateCategory = async (data: {
  categoryId: string
  name?: string
}) => {
  try {
    return await prisma.category.update({
      where: { categoryId: data.categoryId },
      data: {
        name: data.name,
      },
    })
  } catch (err) {
    console.error("Update category error:", err)
    return { error: "Could not update category" }
  }
}

export const deleteCategory = async (categoryId: string) => {
  try {
    return await prisma.category.delete({
      where: { categoryId },
    })
  } catch (err) {
    console.error("Delete category error:", err)
    return { error: "Could not delete category" }
  }
}
