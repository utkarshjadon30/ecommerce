import { defineStore } from "pinia"

export const useLoader = defineStore("loader", () => {
  const isLoading = ref(false)
  return {
    isLoading,
  }
})
