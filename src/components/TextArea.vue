<script setup>
import { ref, onMounted, inject } from 'vue';
import { TextArea, Button } from '@svar-ui/vue-core';
import UserIcon from './Messages/UserIcon.vue';

const props = defineProps({
	focus: { default: false },
	buttonLabel: { default: 'Send' },
	flow: { default: false },
	author: {},
	onpost: { type: Function },
});

const value = defineModel('value', { default: '' });

const textarea = ref(null);
let area;

const _ = inject('wx-i18n').getGroup('comments');

onMounted(() => {
	area = textarea.value.querySelector('textarea');
	if (props.focus) area.focus();
	area.onkeydown = ev => {
		if (ev.key === 'Enter' && (ev.ctrlKey || ev.metaKey)) {
			ev.preventDefault();
			onclick();
		}
	};
});

function onclick() {
	if (!value.value) return;
	props.onpost?.({ value: value.value });
	value.value = '';
	area.focus();
}
</script>

<template>
	<div
		class="wx-comments-textarea"
		:class="{ 'wx-flow': flow }"
		data-focus="yes"
		ref="textarea"
	>
		<div class="wx-textarea-wrapper">
			<div v-if="author" class="wx-textarea-avatar">
				<UserIcon :data="author" />
			</div>
			<TextArea :placeholder="_('Add a comment...')" v-model:value="value" />
		</div>
		<div class="wx-textarea-bottombar">
			<Button type="primary" :onclick="onclick">{{ _(buttonLabel) }}</Button>
		</div>
	</div>
</template>

<style scoped>
.wx-comments-textarea {
	width: 100%;
	background-color: inherit;
	display: flex;
	flex-direction: column;
	gap: 12px;
}
.wx-textarea-wrapper {
	position: relative;
	display: flex;
	gap: 8px;
}
.wx-comments-textarea.wx-flow .wx-textarea-avatar {
	margin-left: 20px;
}
.wx-textarea-bottombar {
	text-align: right;
}
.wx-textarea-bottombar :deep(button) {
	padding: 6px 16px;
	font-weight: 600;
	line-height: 20px;
}
</style>
