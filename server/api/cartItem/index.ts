import {
  findAllCartItems,
  createCartItem,
  updateCartItem,
  deleteCartItem,
} from "~/server/controller/cartItemController"

export default defineEventHandler(async (event) => {
  const method = event.method

  if (method === "GET") {
    const cartItems = await findAllCartItems()
    return { data: cartItems }
  }

  if (method === "POST") {
    const body = await readBody(event)
    const newCartItem = await createCartItem(body)
    return { data: newCartItem, message: " cart item created successfully" }
  }

  if (method === "PUT") {
    const body = await readBody(event)
    const updatedCategory = await updateCartItem(body)
    return { data: updatedCategory, message: "cart item updated Successfully" }
  }

  if (method === "DELETE") {
    const body = await readBody(event)
    await deleteCartItem(body)
    return { message: "cart item deleted Successfully" }
  }
})
