<script setup>
defineOptions({ name: 'DemoLocale' });
import { ref } from 'vue';
import { Locale, Segmented } from '@svar-ui/vue-core';
import { Comments } from '../../src/index';
import { getData } from '../data';

import { de, cn } from '@svar-ui/comments-locales';
import { de as deCore, cn as cnCore } from '@svar-ui/core-locales';

const { data, users } = getData();
const options = [
	{ label: 'Bubbles', id: 'bubbles' },
	{ label: 'Flow', id: 'flow' },
];

const render = ref('flow');

const langs = [
	{ id: 'en', label: 'EN' },
	{ id: 'de', label: 'DE' },
	{ id: 'cn', label: 'CN' },
];
const lang = ref('en');
</script>

<template>
	<div class="toolbar">
		<Segmented :options="langs" v-model:value="lang" />
		<Segmented v-model:value="render" :options="options" />
	</div>
	<div style="margin: 20px; max-width: 700px; margin-top: 40px">
		<template v-if="lang === 'de'">
			<Locale :key="render" :words="{ ...de, deCore }">
				<Comments
					:focus="true"
					:value="data"
					:users="users"
					:active-user="1"
					:render="render"
				/>
			</Locale>
		</template>
		<template v-else-if="lang === 'cn'">
			<Locale :key="render" :words="{ ...cn, cnCore }">
				<Comments
					:focus="true"
					:value="data"
					:users="users"
					:active-user="1"
					:render="render"
				/>
			</Locale>
		</template>
		<template v-else>
			<Comments
				:key="render"
				:focus="true"
				:value="data"
				:users="users"
				:active-user="1"
				:render="render"
			/>
		</template>
	</div>
</template>

<style scoped>
.toolbar {
	margin: 20px;
}
</style>
