<script setup>
import { html } from '../../libs/lima.es.js';

const props = defineProps({
	content: {},
});
</script>

<template>
	<!-- eslint-disable-next-line vue/no-v-html -->
	<span v-html="html(props.content)"></span>
</template>
