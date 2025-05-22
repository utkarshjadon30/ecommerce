<template>
  <div>about</div>
</template>

<script setup>
import { useApi } from "~/composables/useApi"

const { get, isLoading, error } = useApi()

const fetchProducts = async () => {
  try {
    const data = await get("/product")
    console.log(data)
  } catch (err) {
    console.error(error.value)
  }
}

onMounted(() => {
  fetchProducts()
})
</script>

<style lang="scss" scoped></style>
\
