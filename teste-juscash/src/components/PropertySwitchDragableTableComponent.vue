<template>
  <div class="flex w-full gap-4">
    <div class="w-[10rem] grow border border-neutral-300 shadow-md" v-for="(obj, listIndex) in list" :key="listIndex">
      <h3 class="border-b border-neutral-300 py-1 px-2">{{ obj.statusName }}</h3>
      <draggable
        class="py-1 px-2 draggablePlace"
        v-model="obj.itemsList"
        :itemKey="obj.statusName"
        group="listed"
        @change="change"
        v-if="showDraggable"
      >
        <template #item="{ element, index }">
          <div class="bg-slate-700 text-slate-50 rounded-md px-2 py-1 my-[4px] cursor-pointer" @click="$emit('clickOn', {id: index, el:element})">{{ element.name }}</div>
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
      type: Function,
      required: true
    }
  },
  data() {
    return {
      list: this.getter() || [],
      showDraggable: true
    }
  },
  methods: {
    updateComponent: function() {
      this.list = this.getter();
    },
    change: function(evt: any) {
      if (evt.added) 
        this.$emit('changed', this.$data.list)
    }
  }
});

</script>

<style lang="scss" scoped>
.draggablePlace{
  min-height: 100px;
}
</style>
