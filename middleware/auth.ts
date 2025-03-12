import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app";
import { useAuthStore } from "~/stores/authStore";

export default defineNuxtRouteMiddleware((to) => {
    const authStore = useAuthStore();
    if (!authStore.user && to.path !== '/login') {
      return navigateTo('/login');
    }
  });
  