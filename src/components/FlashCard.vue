<template>
	<div
		:class="['flash_card', { flipped: flipped }]"
		@click="flipped = !flipped"
	>
		<div class="cover heads bg-dark flex flex-center q-pa-xl shadow-5">
			<p class="q-ma-none">
				{{ cardDetails.headSide }}
			</p>
		</div>
		<div class="cover tails bg-dark flex flex-center q-pa-xl shadow-5">
			<p
				class="q-ma-none"
				v-for="(detail, j) in cardDetails.flipSide"
				:key="`flip_${j}`"
			>
				{{ detail }}
			</p>
		</div>
	</div>
</template>

<script setup>
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useSettingsStore } from "stores/settings";
const { fromLangs, toLangs } = storeToRefs(useSettingsStore());

const { card } = defineProps(["card"]);

const cardDetails = computed(() => {
	const headSide =
		card[
			fromLangs.value[Math.floor(Math.random() * fromLangs.value.length)]
		];

	let flipSide = [];
	for (const lang of toLangs.value) {
		flipSide.push(card[lang]);
	}

	console.log({ headSide, flipSide });

	return {
		headSide,
		flipSide,
	};
});

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
		transform-style: preserve-3d;
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
