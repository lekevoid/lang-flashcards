<template>
	<div>
		<pre>Oh nooooo</pre>
	</div>
</template>

<script setup>
import { useBaserowStore } from "stores/baserow";

const { out } = useBaserowStore();

console.log(out);
</script>
