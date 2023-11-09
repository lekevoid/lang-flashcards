<template>
	<q-page class="flex flex-center">
		<img
			alt="Quasar logo"
			src="~assets/quasar-logo-vertical.svg"
			style="width: 200px; height: 200px"
		/>
	</q-page>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useBaserowStore } from "stores/baserow";

console.log(process.env.BASEROW_TOKEN);

const { out, swedish } = storeToRefs(useBaserowStore());

console.log(out);
</script>
