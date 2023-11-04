<template>
  <form @submit.prevent="submitForm">
    <div>
      <label for="name">Seu nome completo:</label>
      <input v-model="formData.name" type="text" id="name" required />
    </div>

    <div>
      <label for="email">E-mail:</label>
      <input v-model="formData.email" type="email" id="email" required />
    </div>

    <div>
      <label for="password">Senha:</label>
      <input v-model="formData.password" type="password" id="password" required />
    </div>

    <div>
      <label for="passwordConfirmation">Confirme sua senha:</label>
      <input v-model="formData.passwordConfirmation" type="password" id="passwordConfirmation" required />
    </div>
  </form>
</template>

<script lang="ts">
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      formData: {
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
      },
    };
  },
  methods: {
    submitForm() {
      if (this.validateForm()) {
        //const login = new Login(this.formData);
        //login.sendData();
      }
    },
    validateForm() {
      if (!this.isEmailValid(this.formData.email)) {
        Swal.fire('O email informado é inválido!');
        return false;
      }
      if (this.formData.password !== this.formData.passwordConfirmation) {
        Swal.fire('A senha e a confirmação de senha devem ser idênticas.');
        return false;
      }
      return true;
    },
    isEmailValid(email: string): Boolean {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    },
  },
};
</script>
