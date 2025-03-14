<template>
  <div class="bg-surface-50 dark:bg-surface-950 px-6 py-44 md:px-12 lg:px-20"> 
    <div class="bg-surface-0 dark:bg-surface-900 p-6 shadow rounded-border border-2 max-w-[30%] mx-auto">
      <div class="text-center mb-8">
        <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Create an Account</div>
      </div>
      <form @submit.prevent="handleRegister">
        <label for="username" class="text-surface-900 dark:text-surface-0 font-medium mb-2 block">Username</label>
        <InputText 
          id="username" 
          v-model="form.username" 
          type="text" 
          placeholder="Username" 
          class="w-full mb-4" 
        />

        <label for="password" class="text-surface-900 dark:text-surface-0 font-medium mb-2 block">Password</label>
        <InputText 
          id="password" 
          v-model="form.password" 
          type="password" 
          placeholder="Password" 
          class="w-full mb-4" 
        />

        <label for="confirmPassword" class="text-surface-900 dark:text-surface-0 font-medium mb-2 block">
          Confirm Password
        </label>
        <InputText 
          id="confirmPassword" 
          v-model="form.password_confirm" 
          type="password" 
          placeholder="Confirm Password" 
          class="w-full mb-4" 
        />

        <Button 
          type="submit"
          label="Register" 
          icon="pi pi-user-plus !text-xl !leading-none" 
          class="w-full" 
          :disabled="authStore.isLoading"
        />

        <p v-if="authStore.errorMessage" class="text-red-500 text-sm mt-4">
          {{ authStore.errorMessage }}
        </p>

        <p class="text-center mt-4">
          Already have an account?  
          <NuxtLink to="/login" class="text-primary font-medium">Sign In</NuxtLink>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
middleware: "auth",
});


const authStore = useAuthStore();

interface RegisterForm {
  username: string;
  password: string;
  password_confirm: string;
}
const form = ref<RegisterForm>({
  username: '',
  password: '',
  password_confirm: '',
});


const handleRegister = async () => {
  if (!form.value.username || !form.value.password || !form.value.password_confirm) {
    authStore.errorMessage = "Vui lòng nhập đầy đủ thông tin!";
    return;
  }

  if (form.value.password !== form.value.password_confirm) {
    authStore.errorMessage = "Mật khẩu không khớp!";
    return;
  }

  await authStore.register({
    username: form.value.username,
    password: form.value.password,
  });
};
</script>
