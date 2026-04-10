<script setup>
defineOptions({ name: "CommentsThemesWillowDark" });

import { WillowDark } from "@svar-ui/vue-core";

const props = defineProps({
  fonts: {},
});
</script>

<template>
  <WillowDark v-if="$slots.default" :fonts="props.fonts">
    <slot />
  </WillowDark>
  <WillowDark v-else :fonts="props.fonts" />
</template>

<style scoped>
:global(.wx-willow-dark-theme) {
  --wx-theme-name: willow-dark;

  --wx-comments-msg-background: rgba(122, 102, 235, 0.2);
  --wx-comments-msg-background-agent: #384047;

  --wx-avatar-color-dark: #2a2b2d;
}
</style>
