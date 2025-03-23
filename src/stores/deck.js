import { ref, computed } from "vue";
import { defineStore, storeToRefs } from "pinia";
import { slugify } from "../composables/useTextHelper";

import { useBaserowStore } from "stores/baserow";
import { useMultilangStore } from "stores/multilang";
import { useSettingsStore } from "stores/settings";

export const useDeckStore = defineStore("deck", () => {
	const { arabic, german, swedish, segments } = storeToRefs(
		useBaserowStore(),
	);
	const {
		includeArabic,
		includeGerman,
		includeSwedish,
		enabledSegments,
		mlStartLang,
		mlIncludeEnglish,
		mlIncludeGerman,
		mlIncludeSwedish,
		mlIncludeArabic,
		mlIncludeGreek,
	} = storeToRefs(useSettingsStore());
	const { multilang } = storeToRefs(useMultilangStore());

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

	const multilangDeck = computed(() => {
		const fromLang = mlStartLang.value.value;

		if (multilang.value.length === 0) return [];

		const out = multilang.value
			.filter((term) => term.Active && term.EN !== "")
			.map((term) => {
				let card = { term: "", translations: [] };

				card.term = term[fromLang];

				let hasEnabledSegment = false;
				term.Segments.forEach((segment) => {
					if (
						enabledSegments.value.includes(slugify(segment.value))
					) {
						hasEnabledSegment = true;
					}
				});

				if (!hasEnabledSegment) {
					return null;
				}

				if (fromLang !== "EN" && mlIncludeEnglish.value) {
					card.translations.push(term.EN);
				}

				if (fromLang !== "AR" && mlIncludeArabic.value) {
					card.translations.push(term.AR);
				}

				if (fromLang !== "DE" && mlIncludeGerman.value) {
					card.translations.push(term.DE);
				}

				if (fromLang !== "EL" && mlIncludeGreek.value) {
					card.translations.push(term.EL);
				}

				if (fromLang !== "SV" && mlIncludeSwedish.value) {
					card.translations.push(term.SV);
				}

				card.id = hashCode(card.term);

				return card;
			})
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

	const mlUsedSegments = computed(() => {
		let out = [];

		if (!multilang.value || multilang.value.length === 0) {
			return [];
		}

		console.log(multilang.value);

		multilang.value.forEach(({ Segments: segments }) => {
			segments.forEach((segment) => {
				if (!out.includes(segment.value)) {
					out.push(segment.value);
				}
			});
		});

		console.log(out);

		return out;
	});

	return {
		deck,
		multilangDeck,
		usedSegments,
		mlUsedSegments,
	};
});
