// server/api/category.ts

import {
  findAllCategories,
  createCategory,
} from "~/server/controller/categoryController"

export default defineEventHandler(async (event) => {
  const method = event.method

  if (method === "GET") {
    const categories = await findAllCategories()
    return { data: categories }
  }

  if (method === "POST") {
    const body = await readBody(event)
    const newCategory = await createCategory(body)
    return { data: newCategory, message: "Category created Successfully" }
  }

  return { error: "Method not allowed" }
})
