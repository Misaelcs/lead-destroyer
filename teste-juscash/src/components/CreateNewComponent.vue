<template>
    <div>
        <button class="py-1 px-8 mt-2 mb-4 bg-cyan-500 text-white rounded-md" @click="showModal()">{{ displayName }}</button>
        <ModalComponent ref="modal" type="create" @submit-form="$emit('submitForm')">
            <slot></slot>
        </ModalComponent>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        displayName: {
            type: String,
            required: true as boolean,
        }
    },
    data() {
        return {
            modal: null as any
        }
    },
    mounted() {
        this.modal = this.$refs.modal
    },
    methods: {
        showModal() {
            this.modal.toggleModal(true);
        }
    }
});

</script>

<style scoped></style>
