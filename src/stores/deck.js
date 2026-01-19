import { computed } from "vue";
import { defineStore, storeToRefs } from "pinia";

import { useBaserowStore } from "stores/baserow";
import { useSettingsStore } from "stores/settings";

export const useDeckStore = defineStore("deck", () => {
	const { dico, allLangs } = storeToRefs(useBaserowStore());
	const { fromLangs, toLangs, enabledSegments } = storeToRefs(
		useSettingsStore(),
	);

	const deck = computed(() => {
		return dico.value
			.map((entry) => {
				let out = { id: entry.id };

				if (
					!entry.Segments.some((segment) =>
						enabledSegments.value.includes(segment),
					)
				) {
					return null;
				}

				for (const lang of allLangs.value) {
					if (
						fromLangs.value.includes(lang) ||
						toLangs.value.includes(lang)
					) {
						out[lang] = entry[lang];
					}
				}

				out.order = dico.value.indexOf(entry);

				return out;
			})
			.filter(Boolean)
			.sort(() => Math.random() - 0.5);
	});

	return {
		deck,
	};
});
