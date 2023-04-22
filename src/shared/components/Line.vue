<script setup lang="ts">
import { computed, ref } from 'vue';
import { marked } from 'marked';

const props = defineProps<{
  id: number;
  markdown: string;
  editMode: boolean;
}>()

const emit = defineEmits<{
  (e: 'edit', id: number): void;
  (e: 'save', id: number, markdown: string): void;
}>();

const content = computed(() => marked.parse(props.markdown));
const markdownTemp = ref(props.markdown);

const editArea = ref<HTMLDivElement>();
const onEdit = () => {
  emit('edit', props.id);
  setTimeout(() => {
    const elem = editArea.value as HTMLDivElement;
    elem.focus();
    });
}

</script>

<template>
  <div class="line">
    <template v-if="!editMode">
      <button @click="onEdit">Edit</button>
      <div v-html="content" class="field" @dblclick="onEdit" />
    </template>
    <template v-else>
      <button @click="$emit('save', id, markdownTemp)">Save</button>
      <div
        ref="editArea"
        class="edit"
        @input="markdownTemp = $event.target.innerText"
        @keydown.enter="$emit('save', id, markdownTemp)"
        contenteditable
      >{{ markdown }}</div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.line {
  & > button {
    width: 60px;
  }
  & > * {
    display: inline-block;
  }
}

.field, .edit {
  padding: 2px 10px;
}

:deep(.field *) {
  margin: 0;
  padding: 0;
}

.edit {
  outline: none;
  border-bottom: 1px solid #8a8a8a;
}
</style>