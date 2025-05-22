import { defineStore } from "pinia"
import { useApi } from "~/composables/useApi"
import { useStorage } from "@vueuse/core"

export const useEcommerce = defineStore("ecommerce", () => {
  const userRole = useStorage("userRole", "")
  const categoryList = ref([])
  const categoryDialog = ref(false)
  const snackbar = ref(false)
  const snackbarMessage = ref("")
  const categoryName = ref("")
  const categoryId = ref("")
  const categoryMode = ref("add")

  const { get, post, put, del, isLoading, error } = useApi()

  const getCategoryList = async () => {
    try {
      const data = await get("/category")
      categoryList.value = data.data
    } catch (err) {
      console.error(error.value)
    }
  }

  const addCategory = async (name: string) => {
    try {
      const data = await post("/admin/category", { name })
      snackbar.value = true
      snackbarMessage.value = data.message

      getCategoryList()
    } catch (err) {
      console.error(error.value)
    }
  }

  const editCategory = async (categoryId: string, name: string) => {
    try {
      const data = await put(`/admin/category/${categoryId}`, { name })
      snackbar.value = true
      snackbarMessage.value = data.message

      getCategoryList()
    } catch (err) {
      console.error(error.value)
    }
  }

  const deleteCategory = async (categoryId: string) => {
    try {
      const data = await del(`/admin/category/${categoryId}`)
      snackbar.value = true
      snackbarMessage.value = data.message

      getCategoryList()
    } catch (err) {
      console.error(error.value)
    }
  }

  return {
    userRole,
    categoryList,
    getCategoryList,
    addCategory,
    isLoading,
    error,
    categoryDialog,
    snackbar,
    snackbarMessage,
    categoryName,
    categoryId,
    categoryMode,
    editCategory,
    deleteCategory,
  }
})
