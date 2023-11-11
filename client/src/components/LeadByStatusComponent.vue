<template>
  <div class="px-[16rem]">
    <CreateNewComponent ref="CreateNew" display-name="+ Novo Lead" @submit-form="submitForm()" @close-modal="$refs.Table.updateComponent()" @enter-edit="$refs.LeadForm.disabled = false">
      <LeadFormComponent ref="LeadForm"></LeadFormComponent>
    </CreateNewComponent>
    <PropertySwitchDragableTableComponent ref="Table" @click-on="openModalForUpdate" @changed="changeStatus" :getter="getLeadsByStatus" ></PropertySwitchDragableTableComponent>
  </div>		
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { LeadController } from './../controllers/lead';

export default defineComponent({
	data() {
    return {
      post: [],
			clickOnLead: false
    }
  },
  methods: {
    getLeadsByStatus() {
      const lead = new LeadController();
			return lead.getLeadsByStatus();
    },
		submitForm() {
			this.$refs.LeadForm.submitForm()
		},
    openModalForUpdate: function(arg: any) {
			this.$refs.CreateNew.openModalForUpdate()
			setTimeout(() => {
				this.$refs.LeadForm.setDataForUpdate(arg)
			}, 200);
    },
		changeStatus(list: any) {
			const lead = new LeadController();
			return lead.updateLeadsStatus(list);
		}
  }
});
</script>
