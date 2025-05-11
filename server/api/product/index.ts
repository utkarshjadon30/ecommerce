// server/api/users.ts

import {
  findAllProduct,
  createProduct,
} from "~/server/controller/product/productController"

export default defineEventHandler(async (event) => {
  const method = event.method

  if (method === "GET") {
    const products = await findAllProduct()
    console.log(products)
    return { data: products }
  }

  if (method === "POST") {
    const body = await readBody(event)
    console.log(body)
    const newProduct = await createProduct(body)
    return { data: newProduct, message: "Product created Successfully" }
  }

  return { error: "Method not allowed from this" }
})
