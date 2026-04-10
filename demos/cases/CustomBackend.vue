<script setup>
import { ref } from 'vue';
import { Comments } from '../../src/index';
import { getData } from '../data';

const stub = getData();
const users = stub.users;

let prev = localStorage.getItem('--comments-demo-data');
let data = prev ? JSON.parse(prev) : stub.data;
const message = ref('');

function callback(action, obj) {
	switch (action) {
		case 'add': {
			message.value = `The message "${obj.comment.content}" was successfully added`;
			break;
		}
		case 'delete': {
			message.value = `The message was successfully deleted`;
			break;
		}
		case 'update': {
			message.value = `The message was successfully updated`;
			break;
		}
	}
	localStorage.setItem('--comments-demo-data', JSON.stringify(obj.value));
}
</script>

<template>
	<div class="message">{{ message }}</div>
	<div>
		<div class="comments">
			<Comments
				:value="data"
				:onchange="e => callback(e.action, e)"
				:users="users"
				:active-user="1"
			/>
		</div>
	</div>
</template>

<style scoped>
.message {
	padding: 5px 10px;
	background-color: #eee;
	color: #444;
	line-height: 33px;
	height: 40px;
}
.comments {
	margin: 20px;
	max-width: 768px;
	height: calc(100% - 56px);
}
</style>
