import { defineNuxtRouteMiddleware, navigateTo } from "#app";
import { useAuthStore } from "~/stores/authStore"; // Đường dẫn đến store của bạn

export default defineNuxtRouteMiddleware((to) => {
 
  if (import.meta.server) return;

  const authStore = useAuthStore();

  
  if (!authStore.isAuthenticated && to.path !== "/login") {
    return navigateTo("/login");
  }

  
  if (authStore.isAuthenticated && to.path === "/login") {
    return navigateTo("/");
  }
});