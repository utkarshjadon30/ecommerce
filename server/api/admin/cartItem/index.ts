import { findAllCartItems } from "~/server/controller/cartItemController"

export default defineEventHandler(async (event) => {
  const method = event.method

  if (method === "GET") {
    const cartItems = await findAllCartItems()
    return { data: cartItems }
  }
})
