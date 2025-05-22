import vuetify, { transformAssetUrls } from "vite-plugin-vuetify"
export default defineNuxtConfig({
  app: {
    head: {
      link: [{ rel: "icon", href: "/ecommerce.png" }],
    },
  },
  //...
  build: {
    transpile: ["vuetify"],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    //...
    "@pinia/nuxt",
  ],
  pinia: {
    storesDirs: ["./stores/**"],
  },
  ssr: false,

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
})
