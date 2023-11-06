<template>
	<div class="min-h-screen flex flex-col">
		<HeaderComponent></HeaderComponent>
		<div class="px-[16rem]">
			<div class="float-right">
				<CreateNewComponent display-name="+ Novo Lead" @submit-form="submitForm()">
					<LeadFormComponent ref="LeadForm"></LeadFormComponent>
				</CreateNewComponent>
			</div>
			<PropertySwitchDragableTableComponent :list="leadCollection"></PropertySwitchDragableTableComponent>
		</div>
		<div class="grow"></div>
		<FooterComponent></FooterComponent>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { LeadController } from './../controllers/lead';

export default defineComponent({
	data() {
    return {
      post: [],
			leadCollection: {}
    }
  },
  methods: {
    getLeadsByStatus() {
      const lead = new LeadController();
			return lead.getLeadsByStatus();
    },
		submitForm() {
			this.$refs.LeadForm.submitForm()
		}
  },
  mounted() {
    this.leadCollection = this.getLeadsByStatus()
  }
});
</script>

<route lang="yaml">
name: Inicio
</route>