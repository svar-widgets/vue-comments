<script setup>
import { ref } from 'vue';
import { RestURL } from '@svar-ui/lib-data-provider';
import { Comments } from '../../src/index';

import { getData } from '../data';
const users = getData().users;

const loadURL =
	'https://-backend.svar.devcomments/comments-info/1';
const saveURL = new RestURL(
	'https://-backend.svar.devcomments/comments/1'
);

const value = ref([]);
fetch(loadURL)
	.then(r => r.json())
	.then(d => (value.value = d));
</script>

<template>
	<div style="margin: 20px; max-width: 700px; margin-top: 40px">
		<Comments
			:value="value"
			:onchange="({ action, comment, id }) =>
				saveURL.save(action, comment, id)"
			:active-user="users[0]"
		/>
	</div>
</template>
