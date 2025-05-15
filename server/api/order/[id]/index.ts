import { findUserOrders } from "~/server/controller/orderController"

export default defineEventHandler(async (event) => {
  const method = event.method
  const id = event.context.params?.id

  if (!id) {
    return { error: "Product ID is required" }
  }
  if (method === "GET") {
    const order = await findUserOrders(id)
    if (!order) {
      return { error: "order not found" }
    }
    return { data: order }
  }
})
