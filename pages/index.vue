<template>
  <div>
    <UsersListTable />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "../stores/authStore";

definePageMeta({
middleware: "auth",
});


</script>
