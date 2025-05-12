import { findCartItem } from "~/server/controller/cartItemController"

export default defineEventHandler(async (event) => {
  const method = event.method
  const id = event.context.params?.id

  if (!id) {
    return { error: " ID is required" }
  }

  if (method === "GET") {
    const category = await findCartItem(id)
    if (!category) {
      return { error: "id not found" }
    }
    return { data: category }
  }
})
