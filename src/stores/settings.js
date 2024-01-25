import { ref, watch } from "vue";
import { defineStore, storeToRefs } from "pinia";

import { useBaserowStore } from "stores/baserow";

export const useSettingsStore = defineStore("settings", () => {
	const { segments } = storeToRefs(useBaserowStore());

	const includeArabic = ref(false);
	const includeSwedish = ref(true);
	const questionMode = ref("term");
	const enabledSegments = ref([]);

	watch(segments, () => {
		enabledSegments.value = segments.value.map((segment) => segment.value);
	});

	return {
		includeArabic,
		includeSwedish,
		questionMode,
		enabledSegments,
	};
});
