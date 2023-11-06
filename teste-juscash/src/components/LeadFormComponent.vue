<template>
  <form @submit.prevent="submitForm">
    <div>
      <label for="name">Nome Completo*</label>
      <input v-model="formData.name" type="text" name="name" required />
    </div>

    <div>
      <label for="email">E-mail*</label>
      <input v-model="formData.email" type="email" name="email" required />
    </div>

    <div>
      <label for="telephone">Telefone*</label>
      <input v-model="formData.telephone" type="text" name="telephone" required />
    </div>

    <div>
      <div>
        <label for="checkAll">Todos</label>
        <input type="checkbox" id="checkAll" required />
      </div>

      <div>
        <label for="flHonSucumbenciais">Honorários Sucumbenciais</label>
        <input v-model="formData.flHonSucumbenciais" type="checkbox" name="flHonSucumbenciais" required />
      </div>

      <div>
        <label for="flHonContratuais">Honarários Contratuais</label>
        <input v-model="formData.flHonContratuais" type="checkbox" name="flHonContratuais" required />
      </div>

      <div>
        <label for="flHonDativos">Honorários Dativos</label>
        <input v-model="formData.flHonDativos" type="checkbox" name="flHonDativos" required />
      </div>

      <div>
        <label for="flCreditoAutor">Crédito do Autor</label>
        <input v-model="formData.flCreditoAutor" type="checkbox" name="flCreditoAutor" required />
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { LeadController } from './../controllers/lead';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      formData: {
        name: '',
        email: '',
        telephone: '',
        flHonSucumbenciais: false,
        flHonContratuais: false,
        flHonDativos: false,
        flCreditoAutor: false
      },
    };
  },
  methods: {
    submitForm() {
      if (this.validateForm()) {
        const lead = new LeadController();
        lead.create(this.formData)
      }
    },
    validateForm() {
      if (!this.isEmailValid(this.formData.email.toString())) {
        Swal.fire('O email informado é inválido!');
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
