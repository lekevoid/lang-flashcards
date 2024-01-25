<template>
	<div
		:class="['flash_card', { flipped: flipped }]"
		v-if="questionMode === 'term'"
		@click="flipped = !flipped"
	>
		<div class="cover heads bg-dark flex flex-center q-pa-xl shadow-5">
			<p class="q-ma-none">{{ card.term }}</p>
		</div>
		<div class="cover tails bg-dark flex flex-center q-pa-xl shadow-5">
			<p class="q-ma-none">{{ card.translation }}</p>
		</div>
	</div>
	<div
		:class="['flash_card', { flipped: flipped }]"
		v-if="questionMode === 'translation'"
		@click="flipped = !flipped"
	>
		<div class="cover heads bg-dark flex flex-center q-pa-xl shadow-5">
			<p class="q-ma-none">{{ card.translation }}</p>
		</div>
		<div class="cover tails bg-dark flex flex-center q-pa-xl shadow-5">
			<p class="q-ma-none">{{ card.term }}</p>
		</div>
	</div>
</template>

<script setup>
import { ref, defineProps } from "vue";
import { storeToRefs } from "pinia";
import { useSettingsStore } from "stores/settings";
const { questionMode } = storeToRefs(useSettingsStore());

const { card } = defineProps(["card"]);

const flipped = ref(false);
</script>

<style lang="scss">
.flash_card {
	transition: transform 1s ease;
	position: relative;
	width: 90vw;
	height: 70vh;
	transform-style: preserve-3d;
	perspective: 600px;
	max-width: 800px;
	max-height: 400px;
	margin: auto auto;
	font-size: min(10vw, 40px);
	text-align: center;

	.cover {
		border-radius: 0.6em;
		overflow: hidden;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		transition: transform 1s ease;
	}

	.heads {
		transform: translateZ(0px);
	}

	.tails {
		transform: translateZ(-2px) rotateY(180deg);
	}

	p {
		user-select: none;
		pointer-events: none;
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
