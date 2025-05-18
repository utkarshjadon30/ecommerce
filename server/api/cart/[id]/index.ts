// server/api/category/[id].ts

import { findSingleCart, deleteCart } from "~/server/controller/cartController"

export default defineEventHandler(async (event) => {
  const method = event.method
  const id = event.context.params?.id

  if (!id) {
    return { error: " ID is required" }
  }

  if (method === "GET") {
    const category = await findSingleCart(id)
    if (!category) {
      return { error: "id not found" }
    }
    return { data: category, message: "Cart found Successfully single" }
  }

  if (method === "DELETE") {
    await deleteCart(id)
    return { message: "cart deleted Successfully" }
  }

  return { error: "Method not allowed" }
})
