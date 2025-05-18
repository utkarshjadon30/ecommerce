// server/api/users.ts

import { createProduct } from "~/server/controller/productController"

export default defineEventHandler(async (event) => {
  const method = event.method

  if (method === "POST") {
    const body = await readBody(event)
    console.log(body)
    const newProduct = await createProduct(body)
    return { data: newProduct, message: "Product created Successfully" }
  }

  return { error: "Method not allowed from this" }
})
