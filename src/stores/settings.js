import { ref, watch } from "vue";
import { defineStore, storeToRefs } from "pinia";
import { SessionStorage } from "quasar";

import { useBaserowStore } from "stores/baserow";

export const useSettingsStore = defineStore("settings", () => {
	const { dico, allSegments, allLangs } = storeToRefs(useBaserowStore());

	const langsHaveChanged = ref(false);
	const fromLangs = ref(SessionStorage.getItem("fromLangs") || ["DE"]);
	const toLangs = ref(SessionStorage.getItem("toLangs") || ["EN"]);

	const enabledSegments = ref(
		SessionStorage.getItem("enabledSegments") || [],
	);

	function toggleFromLang(lang) {
		langsHaveChanged.value = true;
		let out = fromLangs.value;
		if (out.includes(lang)) {
			if (out.length === 1) return;
			out = out.filter((l) => l !== lang);
		} else {
			if (toLangs.value.includes(lang)) {
				if (toLangs.value.length === 1) return;
				toLangs.value = toLangs.value.filter((l) => l !== lang);
			}
			out.push(lang);
		}
		fromLangs.value = out;
	}

	function toggleToLang(lang) {
		langsHaveChanged.value = true;
		let out = toLangs.value;
		if (out.includes(lang)) {
			if (out.length === 1) return;
			out = out.filter((l) => l !== lang);
		} else {
			if (fromLangs.value.includes(lang)) {
				if (fromLangs.value.length === 1) return;
				fromLangs.value = fromLangs.value.filter((l) => l !== lang);
			}
			out.push(lang);
		}
		toLangs.value = out;
	}

	watch(allSegments, () => {
		enabledSegments.value = allSegments.value;
	});

	watch(
		[langsHaveChanged, fromLangs, toLangs],
		() => {
			SessionStorage.set("fromLangs", fromLangs.value);
			SessionStorage.set("toLangs", toLangs.value);
			langsHaveChanged.value = false;
		},
		{ immediate: true },
	);

	return {
		fromLangs,
		toLangs,
		enabledSegments,
		allSegments,
		allLangs,
		toggleFromLang,
		toggleToLang,
	};
});
