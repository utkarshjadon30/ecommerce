import { createOrderItem } from "~/server/controller/orderItemController"

export default defineEventHandler(async (event) => {
  const method = event.method

  if (method === "POST") {
    const body = await readBody(event)
    const newOrderItem = await createOrderItem(body)
    return { data: newOrderItem, message: "Order Item created Successfully" }
  }
})
