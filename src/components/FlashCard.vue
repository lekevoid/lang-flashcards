<template>
	<div
		:class="['flash_card', { flipped: flipped }]"
		@click="flipped = !flipped"
	>
		<div class="cover heads flex flex-center">
			{{ card.term }}
		</div>
		<div class="cover tails flex flex-center">
			{{ card.translation }}
		</div>
	</div>
</template>

<script setup>
import { ref, defineProps } from "vue";
import { storeToRefs } from "pinia";
import { useSettingsStore } from "stores/settings";
const { includeArabic, includeSwedish } = storeToRefs(useSettingsStore());

const { card } = defineProps(["card"]);

const flipped = ref(false);
</script>

<style lang="scss">
.flash_card {
	transition: transform 1s ease;
	position: relative;
	width: 90vw;
	height: 80vh;
	transform-style: preserve-3d;
	perspective: 600px;
	max-width: 600px;
	max-height: 400px;
	margin: auto auto;
	font-size: min(10vw, 40px);
	text-align: center;

	.cover {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: #fff;
		transition: transform 1s ease;
	}

	.heads {
		transform: translateZ(0px);
	}

	.tails {
		transform: translateZ(-2px) rotateY(180deg);
	}

	&.flipped {
		transform: rotateY(180deg);

		.tails {
			transform: translateZ(0px) rotateY(180deg);
		}

		.heads {
			transform: translateZ(2px);
		}
	}
}
</style>
