import { createOrder } from "~/server/controller/orderController"

export default defineEventHandler(async (event) => {
  const method = event.method

  if (method === "POST") {
    const body = await readBody(event)
    const newOrder = await createOrder(body)
    return { data: newOrder, message: "Order created Successfully" }
  }
})
