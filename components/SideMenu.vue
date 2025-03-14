<template>
  <div class="flex whitespace-nowrap">
    <!-- Sidebar -->
    <div
      class="h-screen bg-white dark:bg-surface-900 shadow-lg transition-all duration-300"
      :class="visible ? 'w-64' : 'w-16'"
    >
      <div class="flex items-center justify-between p-4">
        <span v-if="visible" class="font-semibold text-2xl text-primary">Dashboard</span>
        <Button
          type="button"
          @click="toggleSidebar"
          :icon="visible ? 'pi pi-times' : 'pi pi-bars'"
          rounded
          outlined
        />
      </div>

      <div class="p-4 ">
        <ul class="space-y-4 ">
          <li>
            <a
              class="flex items-center p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition"
            >
              <i class="pi pi-home text-lg"></i>
              <span v-if="visible" class="ml-2 font-medium">Dashboard</span>
            </a>
          </li>
          <li>
            <a
              class="flex items-center p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition"
            >
              <i class="pi pi-bookmark text-lg"></i>
              <span v-if="visible" class="ml-2 font-medium">Bookmarks</span>
            </a>
          </li>
          <li>
            <a
              class="flex items-center p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition"
            >
              <i class="pi pi-users text-lg"></i>
              <span v-if="visible" class="ml-2 font-medium">Team</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const visible = ref(true);

const toggleSidebar = () => {
  visible.value = !visible.value;
};
</script>
