<template>
	<div class="lexicon">
		<pre>{{ swedish }}</pre>
	</div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useBaserowStore } from "stores/baserow";

const { swedish } = storeToRefs(useBaserowStore());
</script>

<style lang="scss">
.lexicon {
	height: 400px;
	overflow-y: scroll;
}
</style>
