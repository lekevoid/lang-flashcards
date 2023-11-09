<template>
	<q-page class="flex flex-center">
		<pre>{{ deck }}</pre>
	</q-page>
</template>

<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useBaserowStore } from "stores/baserow";

const { arabic, swedish } = storeToRefs(useBaserowStore());

const deck = computed(() => {
	return [...arabic.value, ...swedish.value];
});
</script>
