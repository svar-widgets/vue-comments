<script setup>
import { ref } from 'vue';
import { Segmented } from '@svar-ui/vue-core';
import { Comments } from '../../src/index';
import { getData } from '../data';

const { data, users } = getData();
const options = [
	{ label: 'Bubbles', id: 'bubbles' },
	{ label: 'Flow', id: 'flow' },
];

const render = ref('flow');
</script>

<template>
	<div class="toolbar">
		<Segmented v-model:value="render" :options="options" />
	</div>
	<div style="margin: 20px; max-width: 700px; margin-top: 40px">
		<Comments
			:key="render"
			:focus="true"
			:value="data"
			:users="users"
			:active-user="1"
			:render="render"
		/>
	</div>
</template>

<style scoped>
.toolbar {
	margin: 20px;
}
</style>
