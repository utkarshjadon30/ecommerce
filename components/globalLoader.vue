<!-- components/GlobalLoader.vue -->
<template>
  <v-overlay
    :model-value="loader.isLoading"
    class="z-50 d-flex justify-center align-center"
    persistent
  >
    <div>
      <div class="text-h5">Loading...</div>
      <v-progress-circular indeterminate size="64" color="primary" />
    </div>
  </v-overlay>
</template>

<script setup>
const loader = useLoader()
</script>
