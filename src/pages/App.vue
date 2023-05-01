<script setup lang="ts">
import { ref } from 'vue';
import Line from '@/shared/components/Line.vue';

interface LineData {
  id: number;
  content: string;
}

const title = ref<string>('Hello, world!');
const lines = ref<LineData[]>([
  {
    id: 1,
    content: 'Change me'
  }
]);

function* createEmptyLineObject(id: number): Generator<LineData, any, LineData> {
  let lastId = id;
  while (true) {
    yield {
      id: ++lastId,
      content: 'Change me',
    };
  }
}

const emptyLineGenerator = createEmptyLineObject(1);

const saveLine = (id: number, content: string) => {
  lines.value[id].content = content;
}

const addNextLine = (id: number) => {
  const index = lines.value.findIndex(elem => elem.id === id);
  lines.value = [
    ...lines.value.slice(0, index + 1),
    emptyLineGenerator.next().value,
    ...lines.value.slice(index + 1)
  ]
}

const deleteLine = (id: number) => {
  const index = lines.value.findIndex(elem => elem.id === id);
  lines.value.splice(index, 1);
  if (!lines.value.length) {
    lines.value.push(emptyLineGenerator.next().value);
  }
}

</script>

<template>
  <div class="container">
    <div class="page">
      <h1>{{ title }}</h1>
      <Line
        v-for="line in lines"
        :key="line.id"
        :id="line.id"
        :value="line.content"
        @save="saveLine"
        @add-next="addNextLine"
        @delete="deleteLine"
      />
    </div>
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
