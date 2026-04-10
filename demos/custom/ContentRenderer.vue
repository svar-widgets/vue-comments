<script setup>
const props = defineProps({
	content: {},
});

const customFormat = text => {
	// Convert @mentions: @[Name](user:id) -> <a href="/users/id">Name</a>
	return text.replace(
		/@\[(.*?)\]\(user:(\d+)\)/g,
		'<a href="/users/$2">$1</a>'
	);
};
</script>

<template>
	<!-- eslint-disable-next-line vue/no-v-html -->
	<div class="text" v-html="customFormat(props.content)"></div>
</template>

<style scoped>
.text :deep(a) {
	color: var(--wx-color-primary);
}
</style>
