<template>
	<div class="lexicon">
		<pre>{{ deck }}</pre>
	</div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useDeckStore } from "stores/deck";
const { deck } = storeToRefs(useDeckStore());
</script>

<style lang="scss">
.lexicon {
	height: 200px;
	overflow-y: scroll;
}
</style>
