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

    <div class="checkboxContainer">
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
        id: -1,
        name: '',
        email: '',
        telephone: '',
        flHonSucumbenciais: false,
        flHonContratuais: false,
        flHonDativos: false,
        flCreditoAutor: false,
        status: 'Cliente em Potencial'
      },
    };
  },
  methods: {
    submitForm() {
      try {
        this.$emit('startSubmit')
        this.checkIfEmailIsValid(this.formData.email.toString())
        const lead = new LeadController();
        
        if (this.formData.id !== -1)
          lead.update(this.formData)
        else
          lead.create(this.formData)

      } catch (error: any) {
        this.$emit('endSubmit')
        Swal.fire(error.message);
      } finally {
        this.$emit('endSubmit')
      }
    },
    checkIfEmailIsValid(email: string) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) throw new Error("O email informado é inválido!");
    },
    setDataForUpdate(args: any) {
      this.formData = {
        id: args.id,
        name: args.el.name,
        email: args.el.email,
        telephone: args.el.telephone,
        flHonSucumbenciais: args.el.flHonSucumbenciais,
        flHonContratuais: args.el.flHonContratuais,
        flHonDativos: args.el.flHonDativos,
        flCreditoAutor: args.el.flCreditoAutor,
        status: args.el.status
      };
    }
  },
  created() {
  }
};
</script>
