<template>
	<div class="lexicon">
		<pre>{{ swedish }}</pre>
	</div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useBaserowStore } from "stores/baserow";

console.log(process.env.BASEROW_TOKEN);

const { out, swedish } = storeToRefs(useBaserowStore());

console.log(out);
</script>

<style lang="scss">
.lexicon {
	height: 400px;
	overflow-y: scroll;
}
</style>
