<script setup>
defineOptions({ name: "CommentsThemesWillow" });

import { Willow } from "@svar-ui/vue-core";

const props = defineProps({
	fonts: {},
});
</script>

<template>
	<Willow v-if="$slots.default" :fonts="props.fonts">
		<slot />
	</Willow>
	<Willow v-else :fonts="props.fonts" />
</template>

<style scoped>
:global(.wx-willow-theme) {
	--wx-theme-name: willow;

	--wx-comments-msg-background: #d5eaf7;
	--wx-comments-msg-background-agent: #f4f5f9;

	--wx-avatar-color-dark: #2a2b2d;
}
</style>
