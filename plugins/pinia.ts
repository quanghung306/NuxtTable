import { defineNuxtPlugin } from '#app'
import { usePinia } from '#imports'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export default defineNuxtPlugin(() => {
    if (import.meta.server) return;
  const pinia = usePinia()
  pinia.use(piniaPluginPersistedstate)
})
