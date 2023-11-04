<script setup lang="ts">
	import JusCashLogo from '@/assets/logo.svg';
	const { t } = useI18n();
</script>

<template>
	<div class="w-full h-screen flex items-center justify-center">
		<div class="flex flex-col bg-neutral-200 min-h-[48rem] w-[32rem] rounded-xl border-neutral-400 border-2 shadow-lg">
			<div class="py-[2rem]">
				<img :src="JusCashLogo" width="300" class="mx-auto" />
			</div>
			<div class="grow border-2 border-red-800" id="loginModalForm">
				<slot></slot>
			</div>
			<div class="flex justify-evenly items-center h-[6rem]">
				<button onclick="" class="w-40 h-10 p-0 text-2xl rounded-lg bg-green-700 text-white font-light">Entrar</button>
				<button onclick="" class="w-40 h-10 p-0 text-2xl rounded-lg bg-cyan-700 text-white font-light">Cadastre-se</button>
			</div>
		</div>
		<div class="fixed bottom-2 flex justify-center items-center h-[2rem]">
			<router-link
				:to="{ name: 'other-page' }"
				class="
					text-center
					hover:text-gray-200
					dark:hover:text-gray-500
				"
				>{{ t('pages.other.menu') }}</router-link
			>
		</div>
	</div>
</template>

<route lang="yaml">
name: home
</route>

<style scoped lang="scss">
#loginModalForm {
  div {
    display: flex;
    flex-direction: column;

    input {
      border: 2px solid grey;
      border-radius: 1px;
      color: grey;
    }

    input:active {
      color: darkgrey;
    }

    label {
      color: rgb(68, 68, 68);
    }
  }
}
</style>
