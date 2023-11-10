<template>
	<q-page class="row flex-center">
		<div
			class="row flex-center full-height full-width"
			v-if="deck.length > 0"
		>
			<q-carousel
				class="col col-12 bg-transparent"
				v-model="currentCardID"
				animated
				swipeable
				infinite
				transition-prev="slide-right"
				transition-next="slide-left"
			>
				<q-carousel-slide
					v-for="card in deck"
					:name="card.id"
					:key="card.id"
				>
					<FlashCard :card="card" />
				</q-carousel-slide>
			</q-carousel>
		</div>
	</q-page>
</template>

<script setup>
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useDeckStore } from "stores/deck";
import { useSettingsStore } from "stores/settings";

import FlashCard from "components/FlashCard.vue";

const { deck } = storeToRefs(useDeckStore());
const { questionMode } = storeToRefs(useSettingsStore());

const currentCardID = ref(0);

watch(deck, (next, prev) => {
	if (next.length === 0) {
		currentCardID.value = 0;
		return;
	}

	if (prev.length === 0 && next.length > 0) {
		currentCardID.value = next[0].id;
		return;
	}

	if (prev[0] !== next[0]) {
		currentCardID.value = next[0].id;
	}
});
</script>
