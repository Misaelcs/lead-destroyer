<template>
    <div>
        <button class="py-1 px-8 mt-2 mb-4 bg-cyan-500 text-white rounded-md float-right" @click="showModal = true; modalType = 'create'">{{ displayName }}</button>
        <Transition name="fade">
			<div class="fixed bottom-0 left-0 w-screen h-screen opacity-50 bg-neutral-800" v-if="showModal"></div>
		</Transition>
        <Transition name="bounce">
            <ModalComponent 
                v-if="showModal"
                ref="Modal" 
                :kind="modalType" 
                @submit-form="$emit('submitForm')"
                @close-modal="showModal = false; $emit('closeModal')"
            >
                <slot></slot>
            </ModalComponent>
        </Transition>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            showModal: false,
            modalType: 'create',
            updateId: -1,
            updateElement: null
        }
    },
    props: {
        displayName: {
            type: String,
            required: true as boolean,
        }
    },
    methods: {
        openModalForUpdate() {
            this.modalType = 'edit';
            this.showModal = true;
        }
    }
});

</script>

<style scoped></style>
