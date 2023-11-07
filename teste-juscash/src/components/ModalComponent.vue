<template>
	<div class="absolute w-[50%] h-[60%] left-[25%] top-[15%] bg-white rounded-lg shadow-lg
				flex flex-col">
		<div class="h-[60px] flex items-center justify-between pr-[10px] pl-[12px] border-b">
			<span class="text-neutral-800">{{ modalTitle || 'Adicionar Item'}}</span>
			<div>
				<icon-material-symbols-close v-if="modalKind != 'edit'" @click="$emit('closeModal')" class="cursor-pointer hover:text-red-800 transition-all"></icon-material-symbols-close>
			</div>
		</div>
		<div class="grow overflow-y-auto p-4 scrollBeauty" id="modalContent">
			<slot></slot>
		</div>
		<div class="h-[80px] border-t flex items-center justify-between px-[1rem]">
			<div>{{ footerText }}</div>
			<div class="flex gap-[10px]">
				<button class="py-[3px] px-[1rem] text-white rounded-md bg-red-600" v-if="modalKind == 'edit'" @click="$emit('closeModal')">Cancelar</button>
				<button class="py-[3px] px-[1rem] text-white rounded-md bg-sky-600" v-if="modalKind == 'edit'" @click="$emit('submitForm'); graciousCloseItself()">Editar</button>
				<button class="py-[3px] px-[1rem] text-white rounded-md bg-green-600" v-if="modalKind != 'edit'" @click="$emit('submitForm'); graciousCloseItself()">Salvar</button>
			</div>
		</div>
	</div>
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
		kind: {
			type: String
		}
	},
	data() {
		return {
			modalKind: this.kind as String
		}
	},
	methods: {
		graciousCloseItself() {
			setTimeout(() => {
				this.$emit('closeModal');
			}, 400);
		}
	}
})

</script>

<style lang="scss">

#modalContent {
	div {
    display: flex;
    flex-direction: column;
		padding-bottom: 1.2rem;
		font-size: 1rem;

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
    }

  }

	.checkboxContainer {
		div {
			display: flex;
			flex-direction: row-reverse !important;
			justify-content: left;
			gap: 0.3rem;

			input {
				margin-top: 4px;
			}
		}
	}
}

.bounce-enter-active {
  animation: bounce-in 0.4s;
}

.bounce-leave-active {
  animation: bounce-in 0.4s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  55% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}


.scrollBeauty::-webkit-scrollbar {
  width: 5px;
}
 
.scrollBeauty::-webkit-scrollbar-track {
  background: #ddd;
}
 
.scrollBeauty::-webkit-scrollbar-thumb {
  background: #666; 
}
</style>
