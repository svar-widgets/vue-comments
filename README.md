<div align="center">

# SVAR Vue Comments

[![npm](https://img.shields.io/npm/v/@svar-ui/vue-comments.svg)](https://www.npmjs.com/package/@svar-ui/vue-comments)
[![License](https://img.shields.io/github/license/svar-widgets/comments)](https://github.com/svar-widgets/comments/blob/main/license.txt)
[![npm downloads](https://img.shields.io/npm/dm/@svar-ui/vue-comments.svg)](https://www.npmjs.com/package/@svar-ui/vue-comments)

</div>

<div align="center">

[Documentation](https://docs.svar.dev/vue/core/comments/) • [Demos](https://docs.svar.dev/vue/core/samples-comments/#/base/willow)

</div>

A Vue UI component for creating a comments section. Supports adding, editing, and deleting comments with ease. Fully compatible with Vue 3.

<div align="center">
	
<img src="https://svar.dev/images/github/github-commenta.png" alt="SVAR Comments - Vue Comments Section" style="width: 700px;">

</div>

**Key features**:

- Bubbles or flow layouts
- Event handling to track changes and synchronize with external systems
- Specifying the currently active user to highlight their comments or give special permissions (such as editing or deleting)
- Readonly or editable modes
- Localization and date format customization
- Light and dark themes

### :hammer_and_wrench: How to Use

To start using the **Comments** component, simply import the package and include the desired component in your Vue file:

```vue
<script setup>
import { ref } from "vue";
import { Comments } from "@svar-ui/vue-comments";
import "@svar-ui/vue-comments/all.css";

const value = ref([/* comments data here */]);
</script>

<template>
  <Comments value="data" />
</template>
```

For further instructions, see the [detailed guide](https://docs.svar.dev/vue/core/comments/).

### :speech_balloon: Need Help?

[Post an Issue](https://github.com/svar-widgets/vue-comments/issues/) or use our [community forum](https://forum.svar.dev).
