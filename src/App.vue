<template>
  <Menubar :model="items">

    <template #start>
      <img src="@/assets/logo.svg" width="80" alt="logo" />
    </template>


    <template #item="{ item, props }">
      <router-link
          v-if="item.route"
          :to="item.route"
          class="flex items-center p-2"
          v-bind="props.action"
      >
        <span :class="item.icon"></span>
        <span class="ml-2">{{ item.label }}</span>
      </router-link>
    </template>


    <template #end>
      <div class="flex items-center gap-2">


        <div v-if="isAuthenticated && user">
          <span class="pi pi-user mr-2"></span>
          {{ user.name }}
          <Button @click="logout" class="ml-2">Выйти</Button>
        </div>


        <div v-else>
          <form @submit.prevent="login" class="flex items-center gap-2">

            <InputText
                v-model="email"
                type="email"
                placeholder="Логин"
                :class="{ 'p-invalid': authError }"
            />

            <InputText
                v-model="password"
                type="password"
                placeholder="Пароль"
                :class="{ 'p-invalid': authError }"
            />

            <Button type="submit">Войти</Button>


          </form>

          <small v-if="authError" class="error">
            {{ authError }}
          </small>
        </div>

      </div>
    </template>

  </Menubar>

  <router-view />
</template>

<script>
import { useAuthStore } from '@/stores/authStore';
import Button from 'primevue/button';
import Menubar from 'primevue/menubar';
import InputText from 'primevue/inputtext';

export default {
  components: {
    Button,
    Menubar,
    InputText
  },

  data() {
    return {
      email: '',
      password: '',
      authStore: useAuthStore(),
      items: [
        { label: 'Главная', icon: 'pi pi-home', route: '/' },
        { label: 'Клиенты', icon: 'pi pi-users', route: '/klient' },
        { label: 'Косметологи', icon: 'pi pi-user', route: '/kosmetolog' },
        { label: 'Услуги', icon: 'pi pi-briefcase', route: '/usluga' },
        { label: 'Сеансы', icon: 'pi pi-calendar', route: '/seans' }
      ]
    };
  },

  computed: {
    isAuthenticated() {
      return this.authStore.isAuthenticated;
    },

    user() {
      return this.authStore.user;
    },

    authError() {
      return this.authStore.errorMessage;
    }
  },

  methods: {
    login() {
      this.authStore.login({
        email: this.email,
        password: this.password
      });
    },

    logout() {
      this.authStore.logout();
    }
  },

  mounted() {
    const token = localStorage.getItem('token');

    if (token) {
      this.authStore.isAuthenticated = true;
      this.authStore.getUser();
    }
  }
};
</script>

<style scoped>
.error {
  color: red;
}
</style>