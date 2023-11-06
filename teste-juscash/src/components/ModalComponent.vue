<template>
	<Transition name="committee" appear>
		<div class="fixed bottom-0 left-0 w-screen h-screen" v-if="show">
			<div class="w-full h-full opacity-50 bg-neutral-800"></div>
			<div class="absolute w-[50%] h-[60%] left-[25%] top-[20%] bg-white rounded-lg shadow-lg
						flex flex-col">
				<div class="h-[2.4rem] flex items-center justify-between px-[1rem] border-b">
					<span class="text-neutral-800">{{ modalTitle || 'Adicionar Item'}}</span>
					<div>
						<icon-material-symbols-close v-if="type != 'edit'" @click="toggleModal(false)" class="cursor-pointer hover:text-red-800 transition-all"></icon-material-symbols-close>
					</div>
				</div>
				<div class="grow">
					<slot></slot>
				</div>
				<div class="h-[3rem] border-t flex items-center justify-between px-[1rem]">
					<div>{{ footerText }}</div>
					<div class="flex gap-[10px]">
						<button class="py-[0.2rem] px-[1rem] text-white rounded-md bg-red-600" v-if="type == 'edit'">Cancelar</button>
						<button class="py-[0.2rem] px-[1rem] text-white rounded-md bg-sky-600" v-if="type == 'edit'">Editar</button>
						<button class="py-[0.2rem] px-[1rem] text-white rounded-md bg-green-600" v-if="type != 'edit'" @click="$emit('submitForm')">Salvar</button>
					</div>
				</div>
			</div>
		</div>
	</Transition>
	
</template>

<script lang="ts">
import { defineComponent } from 'vue';
 
export default defineComponent({
	props: {
		modalTitle: {
			type: String
		},
		footerText : {
			type: String
		},
		type: {
			type: String
		}
	},
	data() {
		return {
			show: false as Boolean,
		}
	},
	methods: {
		toggleModal(show: Boolean) {
			this.show = show;
		}
	}
})

</script>

<style scoped></style>
