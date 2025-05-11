// server/api/category/[id].ts

import {
  findSingleCategory,
  updateCategory,
  deleteCategory,
} from "~/server/controller/categoryController"

export default defineEventHandler(async (event) => {
  const method = event.method
  const id = event.context.params?.id

  if (!id) {
    return { error: "Category ID is required" }
  }

  if (method === "GET") {
    const category = await findSingleCategory(id)
    if (!category) {
      return { error: "Category not found" }
    }
    return { data: category }
  }

  if (method === "PUT") {
    const body = await readBody(event)
    const updatedCategory = await updateCategory({ categoryId: id, ...body })
    return { data: updatedCategory, message: "Category updated Successfully" }
  }

  if (method === "DELETE") {
    await deleteCategory(id)
    return { message: "Category deleted Successfully" }
  }

  return { error: "Method not allowed" }
})
