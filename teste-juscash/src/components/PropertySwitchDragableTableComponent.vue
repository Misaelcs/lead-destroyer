<template>
  <div class="flex w-full gap-4">
    <div class="w-[10rem] grow border border-neutral-300 shadow-md" v-for="(obj, listIndex) in list" :key="listIndex">
      <h3 class="border-b border-neutral-300 py-1 px-2">{{ obj.statusName }}</h3>
      <draggable
        class="py-1 px-2 draggablePlace"
        :list="obj.itemsList"
        @change="log"
        itemKey="id"
        group="listed"
      >
        <template #item="{ element, index }">
          <div class="bg-slate-700 text-slate-50 rounded-md px-2 py-1 my-[4px] cursor-pointer" @click="openUpdateModal(index)">{{ element.name }}</div>
        </template>
        
      </draggable>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import draggable from "vuedraggable";

export default defineComponent({
  components: {
    draggable
  },
  props: {
    getter: {
      type: Function
    }
  },
  data() {
    return {
      list: this.getter() || []
    }
  },
  methods: {
    log: function(evt: any) {
      window.console.log(evt);
    },
		openUpdateModal: function(index: any) {
			console.log(index);
		}
  }
});

</script>

<style lang="scss" scoped>
.draggablePlace{
  min-height: 100px;
}
</style>
