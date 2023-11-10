import { ref, computed } from "vue";
import { defineStore, storeToRefs } from "pinia";

import { useBaserowStore } from "stores/baserow";
import { useSettingsStore } from "stores/settings";

export const useDeckStore = defineStore("deck", () => {
	const { arabic, swedish } = storeToRefs(useBaserowStore());
	const { includeArabic, includeSwedish } = storeToRefs(useSettingsStore());

	function shuffle(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

	function hashCode(str) {
		return Math.abs(
			str.split("").reduce(function (a, b) {
				a = (a << 5) - a + b.charCodeAt(0);
				return a & a;
			}, 0),
		);
	}

	const deck = computed(() => {
		let start = [];

		if (includeArabic.value) {
			start = start.concat(arabic.value);
		}

		if (includeSwedish.value) {
			start = start.concat(swedish.value);
		}

		const out = start
			.map(({ Term: term, Translation: translation }) => {
				if (!term || !translation) {
					return null;
				}

				return { id: hashCode(term + translation), term, translation };
			})
			.filter(Boolean);

		return shuffle(out);
	});

	return {
		deck,
	};
});
