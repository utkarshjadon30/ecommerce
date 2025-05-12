// server/api/cart.ts

import { findAllCarts, createCart } from "~/server/controller/cartController"

export default defineEventHandler(async (event) => {
  const method = event.method

  if (method === "GET") {
    const cartItems = await findAllCarts()
    return { data: cartItems }
  }

  if (method === "POST") {
    const body = await readBody(event)
    const newCartItem = await createCart(body)
    return { data: newCartItem, message: " cart created successfully" }
  }

  return { error: "Method not allowed" }
})
