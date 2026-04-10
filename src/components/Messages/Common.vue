<script setup>
defineOptions({ name: 'CommentsMessageCommon' });
import TextArea from '../TextArea.vue';
import { messages, formats } from './index.js';

const props = defineProps({
	content: {},
	date: {},
	owned: {},
	render: {},
	format: { default: 'text' },
	author: {},
	edit: {},
	onpost: { type: Function },
	oncancel: { type: Function },
});

const BoxRender = typeof props.render === 'string' ? messages[props.render] : props.render;
const TextRender = typeof props.format === 'string' ? formats[props.format] : props.format;
</script>

<template>
	<component :is="BoxRender" :owned="owned" :edit="edit" :author="author" :date="date">
		<template v-if="edit && edit === owned">
			<TextArea :focus="true" :onpost="onpost" :oncancel="oncancel" :value="content" />
		</template>
		<template v-else>
			<component :is="TextRender" :content="content" />
		</template>
	</component>
</template>
