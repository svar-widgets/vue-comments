<script setup>
import { Comments } from "../../src/index";
import { getData } from "../data";

import MessageRenderer from "../custom/MessageRenderer.vue";
import ContentRenderer from "../custom/ContentRenderer.vue";

const { data, users } = getData();

data.forEach(d => {
	d.content = d.content.replace("Alice", "@[Alice](user:1)");
});
</script>

<template>
	<div style="margin: 20px; max-width: 700px; margin-top: 40px;">
		<Comments
			:value="data"
			:users="users"
			:active-user="1"
			:render="MessageRenderer"
			:format="ContentRenderer"
		/>
	</div>
</template>
