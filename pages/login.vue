<template>
  <div class="bg-surface-50 dark:bg-surface-950 px-6 py-44 md:px-12 lg:px-20">
    <div
      class="bg-surface-0 dark:bg-surface-900 p-6 shadow rounded-border border-2 max-w-[30%] mx-auto"
    >
      <div class="text-center mb-8">
        <div
          class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4"
        >
          Welcome Back
        </div>
      </div>
      <form @submit.prevent="handleLogin">
        <label
          for="email"
          class="text-surface-900 dark:text-surface-0 font-medium mb-2 block"
          >username</label
        >
        <InputText
          id="username"
          v-model="form.username"
          type="text"
          placeholder="Email address"
          class="w-full mb-4"
        />

        <label
          for="password"
          class="text-surface-900 dark:text-surface-0 font-medium mb-2 block"
          >Password</label
        >
        <InputText
          id="password"
          v-model="form.password"
          type="password"
          placeholder="Password"
          class="w-full mb-4"
        />

        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center">
            <Checkbox
              id="remember"
              v-model="form.rememberMe"
              :binary="true"
              class="mr-2"
            />
            <label for="remember">Remember me</label>
          </div>
          <a
            class="font-medium no-underline ml-2 text-primary text-right cursor-pointer"
            >Forgot password?</a
          >
        </div>

        <Button
         type="submit"
          label="Sign In"
          icon="pi pi-user !text-xl !leading-none"
          class="w-full"
          :disabled="authStore.isLoading"
        />

        <p v-if="authStore.errorMessage" class="text-red-500 text-sm mt-4">
          {{ authStore.errorMessage }}
        </p>

        <p class="text-center mt-4">
          Don't have an account?
          <NuxtLink to="/register" class="text-primary font-medium"
            >Sign up now!!</NuxtLink
          >
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
middleware: "auth",
});



interface LoginForm {
    username: string;
  password: string;
  rememberMe: boolean;
}

const authStore = useAuthStore();

const form = ref<LoginForm>({
username: "",
  password: "",
  rememberMe: false,
});

const handleLogin = (event: Event) => {
  event.preventDefault();
  authStore.login(form.value);
};
</script>
