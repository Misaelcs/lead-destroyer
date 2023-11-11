<template>
  <form @submit.prevent="submitForm">
    <div v-if="$route.name == 'Cadastrar'" class="relative">
      <label for="name">Seu nome completo:</label>
      <input v-model="v$.name.$model" :class="v$.name.$error ? 'transition-all !outline-red-600 !outline-2' : ''" type="text" id="name" required />
      <transition name="fade">
        <span class="absolute z-[999] text-sm text-red-600 font-bold bottom-[-5px]" v-if="v$.name.$error">*Campo de preenchimento obrigatório.</span>
      </transition>
    </div>

    <div class="relative">
      <label for="email">E-mail:</label>
      <input v-model="v$.email.$model" :class="v$.email.$error && $route.name == 'Cadastrar' ? 'transition-all !outline-red-600 !outline-2' : ''" type="email" id="email" required />
      <transition name="fade">
        <span class="absolute z-[999] text-sm text-red-600 font-bold bottom-[-5px]" v-if="v$.email.$error && $route.name == 'Cadastrar'">*Campo de preenchimento obrigatório.</span>
      </transition>
    </div>

    <div class="relative">
      <label for="password">Senha:</label>
      <input v-model="v$.password.$model" :class="v$.password.$error && $route.name == 'Cadastrar' ? 'transition-all !outline-red-600 !outline-2' : ''" :type="showPassword ? 'text' : 'password'"  id="password" required />
      <div class="absolute right-[2px] top-[31px] z-[98] h-[36px] w-10 rounded-r-md transition-all" :class="showPassword ? 'bg-neutral-50' : 'bg-neutral-200'"></div>
      <icon-mdi-eye @click="showPassword = !showPassword" class="absolute right-3 top-10 cursor-pointer z-[99] transition-all" :class="showPassword ? 'text-neutral-800' : 'text-neutral-600'"></icon-mdi-eye>
      <transition name="fade">
        <span class="absolute z-[999] text-sm text-red-600 font-bold bottom-[-5px]" v-if="v$.password.$error && $route.name == 'Cadastrar'  ">*Campo de preenchimento obrigatório.</span>
      </transition>
    </div>

    <div v-if="$route.name == 'Cadastrar'" class="relative">
      <label for="passwordConfirmation">Confirme sua senha:</label>
      <input v-model="v$.passwordConfirmation.$model" :class="v$.passwordConfirmation.$error ? 'transition-all !outline-red-600 !outline-2' : ''" :type="showPasswordConfirmation ? 'text' : 'password'" id="passwordConfirmation" required />
      <div class="absolute right-[2px] top-[31px] z-[98] h-[36px] w-10 rounded-r-md transition-all" :class="showPasswordConfirmation ? 'bg-neutral-50' : 'bg-neutral-200'"></div>
      <icon-mdi-eye @click="showPasswordConfirmation = !showPasswordConfirmation" class="absolute right-3 top-10 cursor-pointer z-[99] transition-all" :class="showPasswordConfirmation ? 'text-neutral-800' : 'text-neutral-600'"></icon-mdi-eye>
      <transition name="fade">
        <span class="absolute z-[999] text-sm text-red-600 font-bold bottom-[-5px]" v-if="v$.passwordConfirmation.$error">*Campo de preenchimento obrigatório.</span>
      </transition>
    </div>
  </form>
</template>

<script lang="ts">
import Swal from 'sweetalert2';
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, sameAs, helpers } from '@vuelidate/validators'

export default {
  setup () {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      showPassword: false,
      showPasswordConfirmation: false
  };
  },
  methods: {
    submitForm() {
      if(this.$route.name == 'Cadastrar' && this.validateForm()) {
        // const login = new Login(this.$data);
        // login.sendData();
        this.$router.push({name: 'Inicio'})
      } else {
        // const login = new Login(this.$data);
        // login.sendData();
        this.$router.push({name: 'Inicio'})
      }

    },
    validateForm() {
        return !this.v$.name.$error && !this.v$.email.$error && !this.v$.password.$error && !this.v$.passwordConfirmation.$error;
    }
  },
  validations () {
    return {
      name: { required },
      email: { required, email },
      password: { 
        required, 
        minLength: minLength(8),
        hasSpecialLetterNumber: helpers.regex(/^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-])(?=.*\d)(?=.*[a-zA-Z]).{8,}$/)
      },
      passwordConfirmation: { 
        sameAs: sameAs(this.password) 
      }
    }
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}</style>
