<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  id: number;
  value: string;
}>()

defineEmits<{
  (e: 'save', id: number, content: string): void;
  (e: 'addNext', id: number): void;
  (e: 'delete', id: number): void;
}>();

const content = ref(props.value);

</script>

<template>
  <div class="line">
    <button class="add" @click="$emit('addNext', id)">+</button>
    <button class="delete" @click="$emit('delete', id)">-</button>
    <editor @change="$emit('save', id, content)" v-model="content" :inline="true" initial-value=" " tag-name="div" />
  </div>
</template>

<style scoped lang="scss">
  .line {
    display: flex;
    align-items: center;
  }

  :deep(.mce-content-body) {
    margin-left: 10px;
  }

  .add, .delete {
    height: 30px;
    width: 30px;
  }
</style>

<style>
.tox-notifications-container {
    display: none !important;
}
</style>