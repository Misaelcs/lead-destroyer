<script setup lang="ts">
	import JusCashLogo from '@/assets/logo.svg';
</script>

<template>
	<div class="w-full h-screen flex items-center justify-center">
		<div class="flex flex-col bg-neutral-50 w-[32rem] rounded-xl border-neutral-400 border-2 shadow-lg">
			<div class="py-[2rem]">
				<img :src="JusCashLogo" width="300" class="mx-auto" />
			</div>
			<div class="grow px-[2rem]" id="loginModalForm">
				<slot></slot>
			</div>
			<div v-if="$route.name == 'Login'" class="flex justify-end pr-[2rem]">
				<router-link
				:to="{ name: 'Cadastrar' }"
				class="
					transition-all
					hover:text-gray-600
					dark:hover:text-gray-500
				"
				>Ainda não possui uma conta? Cadastre-se.</router-link
			>
			</div>
			<div v-else class="flex justify-end pr-[2rem]">
				<router-link
				:to="{ name: 'Login' }"
				class="
					transition-all
					hover:text-gray-600
					dark:hover:text-gray-500
				"
				>Já possui uma conta? Fazer o login.</router-link
			>
			</div>
			<div class="flex justify-center pb-[2rem] pt-[1.2rem]">
				<button v-if="$route.name == 'Login'" onclick="" class="w-40 h-10 p-0 text-2xl rounded-lg bg-cyan-700 text-white font-light">Entrar</button>
				<button v-else onclick="" class="w-40 h-10 p-0 text-2xl rounded-lg bg-green-700 text-white font-light">Criar Conta</button>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
#loginModalForm {
  div {
    display: flex;
    flex-direction: column;
		padding-bottom: 1.2rem;

    input {
			border: none;
			outline-offset: -2px;
      outline: 2px solid #A1A1A1;
      border-radius: 4px;
      color: grey;
			transition: all ease-in-out 0.2s;
    }

		input:active, input:focus {
			border: none;
			outline-offset: -2px;
			outline-color: #002353;
		}

		input:hover {
			border: none;
			outline-offset: -2px;
			outline-color: #22385791;
		}

    input:active {
      color: darkgrey;
    }

    label {
      color: #222A3E;
			font-size: 1.2rem;
    }
  }
}
</style>
