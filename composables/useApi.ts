import axios from "axios"
import { ref } from "vue"

const apiClient = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
})

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    let datatoken
    if (token) {
      datatoken = JSON.parse(token)
      const currentTime = Math.floor(new Date().getTime() / 1000)
      const CalculateTime = Math.max(0, datatoken.expiresAt - currentTime)

      console.log(CalculateTime, "CalculateTime")

      if (CalculateTime === 0) {
        localStorage.removeItem("token")
        navigateTo("/login")
      }
    }

    console.log(typeof datatoken.token, "token")
    if (token) {
      config.headers.Authorization = `Bearer ${datatoken.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export function useApi() {
  const isLoading = ref(false)
  const error = ref(null)

  const request = async (
    method: string,
    url: string,
    data = null,
    config = {}
  ) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await apiClient({
        method,
        url: `http://localhost:3000/api${url}`,
        data,
        ...config,
      })
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || "An error occurred"
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const get = (url: string, config = {}) => request("GET", url, null, config)
  const post = (url: string, data, config = {}) =>
    request("POST", url, data, config)
  const put = (url: string, data, config = {}) =>
    request("PUT", url, data, config)
  const del = (url: string, config = {}) => request("DELETE", url, null, config)

  return { get, post, put, del, isLoading, error }
}
