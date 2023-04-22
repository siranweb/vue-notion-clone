<script setup lang="ts">
import { ref } from 'vue';
import Line from '@/shared/components/Line.vue';

interface LineData {
  markdown: string;
}

const title = ref<string>('Hello, world!');
const editableLineId = ref<null | number>(null);
let lastLineId = ref<number>(2);
const lines = ref<Record<string, LineData>>({
  1: {
    markdown: 'Example 1',
  },
  2: {
    markdown: 'Example 2',
  },
});

const addLine = () => {
  lines.value[++lastLineId.value] = {
    markdown: 'Line ' + lastLineId.value,
  }
}

const stopEdit = () => {
  editableLineId.value = null;
}

const editButtonClb = (id: number) => {
  editableLineId.value = id;
}

const saveButtonClb = (id: number, markdown: string) => {
  lines.value[id].markdown = markdown;
  stopEdit();
}

</script>

<template>
  <div class="container">
    {{ lines }}
    <div class="page">
      <h1>{{ title }}</h1>
      <Line
        v-for="(line, id) in lines"
        :key="+id"
        :id="+id"
        :markdown="line.markdown"
        :edit-mode="+id === editableLineId"
        @edit="editButtonClb"
        @save="saveButtonClb"
      />
    </div>
    <button @click="addLine">Add</button>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
}

.page {
  width: 600px;
}
</style>
