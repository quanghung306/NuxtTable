<template>
  <div>
    <UsersListTable />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "../stores/authStore";

// definePageMeta({
// middleware: "auth",
// });

const authStore = useAuthStore();

// const handleLogout = () => {
//   authStore.logout();
//   navigateTo("/login");
// };
</script>
