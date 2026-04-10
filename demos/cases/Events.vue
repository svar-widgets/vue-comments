<script setup>
defineOptions({ name: 'DemoEvents' });
import { ref } from 'vue';
import { Comments } from '../../src/index';
import { getData } from '../data';

const { data, users } = getData();

const message = ref('');

function trackChanges({ action, id, comment }) {
	switch (action) {
		case 'add':
			message.value = `New comment was added (${new Date().getTime()})`;
			console.log(`New comment: "${comment.content}" was added `);
			break;
		case 'update':
			message.value = `Comment with id: ${id} was updated`;
			console.log(`Comment with id: ${id} was updated `);
			break;
		case 'delete':
			message.value = `Comment with id: ${id} was deleted`;
			console.log(`Comment with id: ${id} was deleted `);
			break;
	}
}
</script>

<template>
	<div class="message">{{ message }}</div>
	<div>
		<div class="wrapper">
			<Comments
				:value="data"
				:users="users"
				:active-user="1"
				:onchange="trackChanges"
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
.wrapper {
	margin: 20px;
	max-width: 768px;
	height: 100%;
}
</style>
