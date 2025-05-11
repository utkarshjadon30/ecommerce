// server/api/products/[id].ts

import {
  findSingleProduct,
  updateProduct,
  deleteProduct,
} from "~/server/controller/productController"

export default defineEventHandler(async (event) => {
  const method = event.method
  const id = event.context.params?.id

  if (!id) {
    return { error: "Product ID is required" }
  }

  if (method === "GET") {
    const product = await findSingleProduct(id)
    if (!product) {
      return { error: "Product not found" }
    }
    return { data: product }
  }

  if (method === "PUT") {
    const body = await readBody(event)
    const updatedProduct = await updateProduct({ productId: id, ...body })
    return { data: updatedProduct, message: "Product updated Successfully" }
  }

  if (method === "DELETE") {
    await deleteProduct(id)
    return { message: "Product deleted Successfully" }
  }

  return { error: "Method not allowed" }
})
