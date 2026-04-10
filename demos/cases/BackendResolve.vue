<script setup>
import { ref } from 'vue';
import { Segmented } from '@svar-ui/vue-core';
import { RestURL } from '@svar-ui/lib-data-provider';
import { Comments } from '../../src/index';
import { getData } from '../data';

const url = new RestURL(
	'https://-backend.svar.devcomments/comments'
);
const users = getData().users;

const id = ref(1);
const options = [
	{ id: 1, label: 'Page 1' },
	{ id: 2, label: 'Page 2' },
];
</script>

<template>
	<div>
		<div class="toolbar">
			<Segmented v-model:value="id" :options="options" />
		</div>
		<div class="comments">
			<Comments
				:url="url"
				:value="id"
				:ondata="v => url.get(v)"
				:onchange="({ action, comment, id, originalValue: v }) =>
					url.path(v).save(action, comment, id)"
				:active-user="1"
				:users="users"
			/>
		</div>
	</div>
</template>

<style scoped>
.toolbar {
	height: 56px;
	padding: 12px;
}
.comments {
	margin: 20px;
	max-width: 768px;
	height: calc(100% - 56px);
}
</style>
