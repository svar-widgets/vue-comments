<script setup>
defineOptions({ name: "CommentsMessagesTextPlain" });

const props = defineProps({
	content: {},
});
</script>

<template>{{ content }}</template>
