<template>
    <div class="relative inline-block ">
      <!-- Avatar -->
      <img
        :src="'https://res.cloudinary.com/quanghung/image/upload/v1739957900/350512317_2248145465395698_4189543060711641401_n_xcokha.jpg'"
        alt="Avatar"
        class="w-10 h-10 rounded-full border cursor-pointer"
        @click="toggleMenu"
        ref="menuTrigger"
      />
  
      <!-- Dropdown Menu -->
      <OverlayPanel ref="menu">
        <button
          @click="handleLogout"
          class=" px-2 py-1 text-left text-sm hover:text-red-500 hover:bg-gray-200 cursor-pointer"
        >
          Đăng xuất
        </button>
      </OverlayPanel>
    </div>
  </template>
  
  <script setup lang="ts">
  const authStore = useAuthStore();
  const menu = ref<InstanceType<typeof OverlayPanel>>();
  const menuTrigger = ref<HTMLElement>();
  
  const toggleMenu = (event: Event) => {
    menu.value?.toggle(event);
  };
  
 
const handleLogout = () => {
  authStore.logout();
  navigateTo("/login");
};
  </script>
  