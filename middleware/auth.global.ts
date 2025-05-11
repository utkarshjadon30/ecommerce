import { useStorage } from "@vueuse/core"

export default defineNuxtRouteMiddleware((to, from) => {
  const token = useStorage("token", "")
  console.log(token)

  if (token.value && ["login", "register"].includes(to?.name)) {
    return navigateTo("/")
  }

  if (!token.value && !["login", "register"].includes(to.name)) {
    return navigateTo("/login")
  }
})
