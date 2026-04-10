<script setup>
defineOptions({ name: 'CommentsLayout' });
import { ref, computed, watchEffect, inject, provide } from 'vue';
import Messages from './Messages.vue';
import TextArea from './TextArea.vue';
import { ActionMenu } from '@svar-ui/vue-menu';
import { uid } from '@svar-ui/lib-state';
import { dateToString } from '@svar-ui/lib-dom';

const props = defineProps({
	onaction: { type: Function },
	onchange: { type: Function },
	readonly: { default: false },
	render: { default: 'flow' },
	format: { default: 'text' },
	users: {},
	data: {},
	activeUser: {},
	focus: { default: false },
});

const lang = inject('wx-i18n');

const { calendar, comments, formats } = lang.getRaw();
const _ = lang.getGroup('comments');

const dateFormatter = dateToString(
	comments.dateFormat || formats.dateFormat,
	calendar
);
provide('wx-comments-format', {
	dateStr: date => dateFormatter(date),
});
//prevent associating TextArea with outer Field label
provide('wx-input-id', null);

const edit = ref(null);
const value = ref('');
const rawData = ref(props.data);

watchEffect(() => {
	rawData.value = props.data;
});

watchEffect(() => {
	// Access props.data to track it
	const _ = rawData.value;
	// Clear editing state when data is updated
	value.value = '';
	edit.value = null;
});

const unknownUser = { id: 0, name: _('Unknown'), color: 'hsl(0, 0%, 85%)' };

const users = computed(() => {
	if (!props.users) return [];
	return props.users.map(u => {
		if (!u.color)
			return {
				...u,
				color: 'hsl(' + getColor(u.id + u.name) + ', 100%, 85%)',
			};
		return u;
	});
});

const author = computed(() => {
	if (typeof props.activeUser === 'object') return props.activeUser;
	const a = users.value.find(u => u.id === props.activeUser) || unknownUser;
	if (a) return a;
	return {
		id: props.activeUser || -1,
		name: _('Me'),
		color: 'hsl(225, 76%, 67%)',
	};
});

const commentsData = computed(() => {
	if (!rawData.value) return [];

	// data with user objects
	return rawData.value.map(d => {
		if (typeof d.author === 'object') return d;

		const user = users.value ? users.value.find(u => u.id === d.user) : null;
		return {
			...d,
			author: user || unknownUser,
		};
	});
});

function getColor(name) {
	let hash = 0;
	for (let i = 0; i < name.length; i++) {
		hash = name.charCodeAt(i) + ((hash << 5) - hash);
	}
	return (hash % 60) * 6;
}

function add(content) {
	const comment = {
		id: uid(),
		content,
		author: author.value,
		user: author.value.id,
		date: new Date(),
	};

	rawData.value = [...commentsData.value, comment];
	if (props.onchange) {
		const res = props.onchange({ value: rawData.value, comment, action: 'add' });
		if (res && typeof res === 'object') {
			if (res.then) {
				res.then(returnedData => {
					updateAfter(comment.id, returnedData);
				});
			} else {
				updateAfter(comment.id, res);
			}
		}
	}
}

function updateAfter(id, returnedData) {
	const index = rawData.value.findIndex(d => d.id === id);

	const copy = [...rawData.value];
	copy[index] = { ...rawData.value[index], ...returnedData };
	rawData.value = copy;
}

function remove(id) {
	rawData.value = rawData.value.filter(d => d.id !== id);
	props.onchange?.({ value: rawData.value, id, action: 'delete' });
}

function update(id, content) {
	let comment;
	rawData.value = rawData.value.map(d => {
		if (d.id === id) {
			comment = { ...d, content };
			return comment;
		} else return d;
	});

	props.onchange?.({ value: rawData.value, id, action: 'update', comment });
}

function cancelUpdate() {
	edit.value = null;
}

function handleActionMenu(ev) {
	const { context, action } = ev;

	if (!action) return;

	props.onaction?.({ action: 'menu-clicked' });

	switch (action.id) {
		case 'edit-comment':
			edit.value = context;
			break;
		case 'delete-comment':
			remove(context);
			break;
	}
}

const menuItems = [
	{
		id: 'edit-comment',
		text: _('Edit'),
		icon: 'wxi-edit-outline',
	},
	{
		id: 'delete-comment',
		text: _('Delete'),
		icon: 'wxi-delete-outline',
	},
];

const menu = ref(null);
const showMenu = ev => menu.value.show(ev);
</script>

<template>
	<div class="wx-comments-list">
		<ActionMenu
			at="bottom"
			ref="menu"
			:options="menuItems"
			:resolver="item => item"
			data-key="commentMenuId"
			:onclick="handleActionMenu"
		/>
		<div class="wx-list" @click="showMenu">
			<Messages
				:author="author"
				:render="render"
				:data="commentsData"
				:format="format"
				:edit="edit"
				:onpost="ev => update(edit, ev.value)"
				:oncancel="cancelUpdate"
			/>
		</div>
		<TextArea
			v-if="!readonly && !edit"
			:author="author"
			:flow="render === 'flow'"
			:focus="focus"
			:onpost="ev => add(ev.value)"
			button-label="Add"
			v-model:value="value"
		/>
	</div>
</template>

<style scoped>
.wx-comments-list {
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
}
.wx-list {
	display: flex;
	flex-direction: column;
	margin-bottom: 4px;
	overflow-y: auto;
	flex: 1;
}
</style>
