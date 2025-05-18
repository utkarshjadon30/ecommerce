// server/api/category.ts

import { findAllCategories } from "~/server/controller/categoryController"

export default defineEventHandler(async (event) => {
  const method = event.method

  if (method === "GET") {
    const categories = await findAllCategories()
    return { data: categories }
  }

  return { error: "Method not allowed" }
})
