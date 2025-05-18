// server/api/cart.ts

import { findAllCarts } from "~/server/controller/cartController"

export default defineEventHandler(async (event) => {
  const method = event.method

  if (method === "GET") {
    const cartItems = await findAllCarts()
    return { data: cartItems }
  }

  return { error: "Method not allowed" }
})
