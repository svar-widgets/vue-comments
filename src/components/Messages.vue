<script setup>
defineOptions({ name: 'CommentsMessages' });
import { computed } from 'vue';
import Message from './Messages/Common.vue';

const props = defineProps({
  data: {},
  render: { default: 'blocks' },
  format: {},
  author: {},
  edit: {},
  onpost: { type: Function },
  oncancel: { type: Function },
});

const css = computed(() => typeof props.render === 'string' ? props.render : 'blocks');
</script>

<template>
  <div :class="['wx-messages', `wx-${css}`]">
    <Message
      v-for="message in data"
      :key="message.id"
      :content="message.content"
      :date="message.date"
      :author="message.author"
      :owned="message.author.id === author.id ? message.id : null"
      :render="render"
      :edit="edit"
      :format="message.format || format"
      :onpost="onpost"
      :oncancel="oncancel"
    />
  </div>
</template>

<style scoped>
.wx-messages {
  padding: 10px 0;
  display: flex;
  flex-direction: column;
}

.wx-messages.wx-bubbles {
  gap: 24px;
}

.wx-messages.wx-cards {
  gap: 16px;
}

.wx-messages.wx-blocks {
  gap: 24px;
}
</style>
