<template>
 <div class="flex relative ">
   <SideMenu  v-if="authStore.user"/>
   <div  class="flex-1 w-screen" >
     <Navbar  v-if="authStore.user" /> 
      <main class="p-4">
        <slot/> 
      </main>
    </div>
  </div>
</template>
<script setup>
const authStore = useAuthStore();
  onMounted(() => {
    authStore.checkAuth(); 
  });

</script>
