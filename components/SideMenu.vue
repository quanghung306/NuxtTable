<template>
  <div class="flex whitespace-nowrap">
    <!-- Sidebar -->
    <div
      class="h-screen bg-white dark:bg-surface-900 shadow-lg transition-all duration-300 "
      :class="visible ? 'w-64' : 'w-20'"
    >
      <div class="flex items-center justify-between p-4 ">
        <span v-if="visible" class="font-semibold text-2xl text-primary"
          >Dashboard</span
        >
        <Button
          type="button"
          @click="toggleSidebar"
          :icon="visible ? 'pi pi-chevron-right' : 'pi pi-chevron-left'"
          rounded
          transition-all 
          duration-300
          outlined
        />
      </div>

      <div class="p-4">
        <ul class="space-y-4">
          <li v-for="item in menuItems" :key="item.to">
            <NuxtLink
              :to="item.to"
              class="flex items-center px-4 py-4 rounded transition"
              :class="{
                'bg-gray-200 dark:bg-gray-800': isActive(item.to),
                'hover:bg-gray-200 dark:hover:bg-gray-800': !isActive(item.to),
              }"
            >
              <i :class="item.icon" class="text-lg"></i>
              <span v-if="visible" class="ml-2 font-medium">{{
                item.label
              }}</span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

const visible = ref(true);
const route = useRoute();

const menuItems = ref([
  { label: "Dashboard", to: "/", icon: "pi pi-home" },
  { label: "Bookmarks", to: "/UnderConstruction", icon: "pi pi-bookmark" },
]);

const toggleSidebar = () => {
  visible.value = !visible.value;
};

const isActive = (path) => computed(() => route.path === path).value;
</script>

<style scoped>
.router-link-exact-active {
  background-color: #e5e7eb; /* Màu khi active */
}
</style>
