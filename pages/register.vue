<template>
  <div class="bg-white p-6 rounded-lg shadow-md w-96">
    <h2 class="text-2xl font-bold mb-4">Đăng ký</h2>
    <form @submit.prevent="handleRegister">
      <input v-model="form.username" placeholder="Username" class="w-full p-2 border rounded mb-2" />
      <input type="password" v-model="form.password" placeholder="Password" class="w-full p-2 border rounded mb-4" />
      <button class="bg-green-500 text-white p-2 w-full rounded">Đăng ký</button>
    </form>
    <p class="mt-4">Đã có tài khoản? <NuxtLink to="/login" class="text-blue-500">Đăng nhập</NuxtLink></p>
  </div>
</template>

<script setup lang="ts">


// Định nghĩa type cho form đăng ký
interface RegisterForm {
  username: string;
  password: string;
}

const form = ref<RegisterForm>({ username: '', password: '' });

const handleRegister = () => {
  alert('Đăng ký thành công!');
  navigateTo('/login');
};
</script>
