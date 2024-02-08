import { ref, computed } from "vue";
import { defineStore, storeToRefs } from "pinia";
import { slugify } from "../composables/useTextHelper";

import { useBaserowStore } from "stores/baserow";
import { useSettingsStore } from "stores/settings";

export const useDeckStore = defineStore("deck", () => {
	const { arabic, german, swedish, segments } = storeToRefs(
		useBaserowStore(),
	);
	const { includeArabic, includeGerman, includeSwedish, enabledSegments } =
		storeToRefs(useSettingsStore());

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

	function getInitialDecksByLanguage() {
		let out = [];

		if (includeArabic.value) {
			out = out.concat(arabic.value);
		}

		if (includeGerman.value) {
			out = out.concat(german.value);
		}

		if (includeSwedish.value) {
			out = out.concat(swedish.value);
		}

		return out;
	}

	const deck = computed(() => {
		const start = getInitialDecksByLanguage();

		const out = start
			.map(
				({
					Term: term,
					Translation: translation,
					Segment: segments,
				}) => {
					if (!term || !translation) {
						return null;
					}

					let hasEnabledSegment = false;
					segments.forEach((segment) => {
						if (
							enabledSegments.value.includes(
								slugify(segment.value),
							)
						) {
							hasEnabledSegment = true;
						}
					});

					if (!hasEnabledSegment) {
						return null;
					}

					return {
						id: hashCode(term + translation),
						term,
						translation,
					};
				},
			)
			.filter(Boolean);

		return shuffle(out);
	});

	const usedSegments = computed(() => {
		let out = [];
		const start = getInitialDecksByLanguage();

		if (start.length === 0) {
			return [];
		}

		start.forEach(({ Segment: segments }) => {
			segments.forEach((segment) => {
				if (!out.includes(segment.value)) {
					out.push(segment.value);
				}
			});
		});

		return out;
	});

	return {
		deck,
		usedSegments,
	};
});
