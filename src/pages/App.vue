<script setup lang="ts">
import { ref } from 'vue';
import Line from '@/shared/components/Line.vue';

const localStorage = window.localStorage;

interface LineData {
  id: number;
  content: string;
}

function* createEmptyLineObject(id: number): Generator<LineData, any, LineData> {
  let lastId = id;
  while (true) {
    yield {
      id: ++lastId,
      content: 'Change me',
    };
  }
}

const emptyLineGenerator = createEmptyLineObject(0);

const title = ref<string>('Hello, world!');
const storedLines = JSON.parse(localStorage.getItem('lines') as string) as LineData[] ?? [emptyLineGenerator.next().value];
const lines = ref<LineData[]>(storedLines);

const saveLine = (id: number, content: string) => {
  const index = lines.value.findIndex(elem => elem.id === id);
  lines.value[index].content = content;
  localStorage.setItem('lines', JSON.stringify(lines.value));
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
