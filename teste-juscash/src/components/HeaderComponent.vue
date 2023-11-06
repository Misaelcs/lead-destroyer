<template>
  <div class="h-[5rem] w-full mb-4">
    <div class="fixed w-full h-[5rem] top-0 bg-white shadow-lg flex justify-between items-center px-[17rem]">
      <div><img src="@/assets/logo.svg" alt=""></div>
      <div class="flex gap-[1rem]">
        <router-link
				:to="{ name: 'Inicio' }"
				class="
					transition-all
					hover:text-gray-600
					dark:hover:text-gray-500
				"
				>Início</router-link>
        <a href="https://github.com/Misaelcs">GitHub</a>
        <a href="https://www.linkedin.com/in/misaelsauceda/">LinkedIn</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
	
</script>
<style scoped></style>
