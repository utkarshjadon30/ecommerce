<template>
  <v-app>
    <Header />
    <v-main>
      <GlobalLoader />
      <slot></slot>
    </v-main>
  </v-app>
</template>

<script setup></script>

<style lang="scss" scoped></style>
