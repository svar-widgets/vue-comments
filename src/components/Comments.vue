<script setup>
import { ref, watchEffect, onWatcherCleanup } from 'vue';
import Layout from './Layout.vue';
import { Locale } from '@svar-ui/vue-core';
import { en } from '@svar-ui/comments-locales';
import { en as coreEn } from '@svar-ui/core-locales';

defineOptions({ name: 'CommentsComments', inheritAttrs: false });

const props = defineProps({
	ondata: { type: Function },
	onchange: { type: Function },
	value: {},
	readonly: { type: Boolean },
	render: {},
	format: {},
	users: {},
	activeUser: {},
	focus: { type: Boolean },
});

const resolvedData = ref([]);
const isLoading = ref(true);

watchEffect(() => {
	let cancelled = false;
	const finalData = props.ondata && props.value ? props.ondata(props.value) : props.value;

	if (finalData instanceof Promise) {
		isLoading.value = true;
		resolvedData.value = [];
		finalData.then(data => {
			if (!cancelled) {
				resolvedData.value = data;
				isLoading.value = false;
			}
		});
	} else {
		resolvedData.value = finalData || [];
		isLoading.value = false;
	}

	onWatcherCleanup(() => {
		cancelled = true;
	});
});

const handleOnchange = e => {
	e.originalValue = props.value;
	return props.onchange && props.onchange(e);
};
</script>

<template>
	<Locale :words="{ ...coreEn, ...en }" :optional="true">
		<Layout
			v-if="isLoading"
			:data="[]"
			:readonly="props.readonly"
			:render="props.render"
			:format="props.format"
			:users="props.users"
			:active-user="props.activeUser"
			:focus="props.focus"
			:onchange="handleOnchange"
		/>
		<Layout
			v-else
			:data="resolvedData"
			:readonly="props.readonly"
			:render="props.render"
			:format="props.format"
			:users="props.users"
			:active-user="props.activeUser"
			:focus="props.focus"
			:onchange="handleOnchange"
		/>
	</Locale>
</template>
