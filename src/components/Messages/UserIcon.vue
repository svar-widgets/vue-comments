<script setup>
import { computed } from 'vue';
import { getContrastingColor } from '../../helpers/colors';

const props = defineProps({
	data: {
		default: () => ({
			name: '',
			avatar: '',
			color: '',
		}),
	},
	noTransform: { default: false },
	size: { default: 'small' },
	border: { default: true },
});

const firstLetters = computed(() =>
	props.data.name
		.split(' ')
		.map(name => name[0])
		.join('')
);

const style = computed(() => (props.data.color ? `background: ${props.data.color};` : ''));
const css = computed(() =>
	props.data.color
		? `wx-comments-avatar-color-${getContrastingColor(props.data.color)}`
		: ''
);
</script>

<template>
	<div
		:class="['wx-user', `wx-${size}`, css, { 'wx-border': border }]"
		:style="style"
	>
		<img v-if="data.avatar" :src="data.avatar" :alt="data.name" />
		<template v-else-if="noTransform">{{ data.name }}</template>
		<template v-else>{{ firstLetters }}</template>
	</div>
</template>

<style scoped>
.wx-user {
	font-size: 12px;
	font-weight: 500;
	line-height: 12px;
	border-radius: 50%;
	color: var(--wx-color-font);
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	background-color: #ca9cec;
	color: var(--wx-color-font);
}

.wx-user.wx-normal {
	width: 36px;
	height: 36px;
	font-size: var(--wx-font-size);
}

.wx-user.wx-small {
	width: 24px;
	height: 24px;
	font-size: var(--wx-font-size-sm);
}

.wx-user img {
	display: block;
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.wx-user:not(:first-child) {
	margin-left: -15px;
}

.wx-user.wx-comments-avatar-color-light {
	color: var(--wx-color-primary-font);
}

.wx-user.wx-comments-avatar-color-dark {
	color: var(--wx-avatar-color-dark);
}
</style>
