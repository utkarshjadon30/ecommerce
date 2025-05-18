// server/api/users.ts

import { findAllProduct } from "~/server/controller/productController"

export default defineEventHandler(async (event) => {
  const method = event.method

  if (method === "GET") {
    const products = await findAllProduct()
    console.log(products)
    return { data: products, message: "Product found Successfully abcv" }
  }

  return { error: "Method not allowed from this" }
})
