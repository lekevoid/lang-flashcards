import { ref, watch } from "vue";
import { defineStore, storeToRefs } from "pinia";
import { SessionStorage } from "quasar";

import { useBaserowStore } from "stores/baserow";

export const useSettingsStore = defineStore("settings", () => {
	const { segments } = storeToRefs(useBaserowStore());

	const includeGerman = ref(!!SessionStorage.getItem("includeGerman"));
	const includeSwedish = ref(!!SessionStorage.getItem("includeSwedish"));
	const includeArabic = ref(!!SessionStorage.getItem("includeArabic"));
	const questionMode = ref(SessionStorage.getItem("questionMode") || "term");
	const enabledSegments = ref(
		SessionStorage.getItem("enabledSegments") || [],
	);

	const mlStartLang = ref(
		SessionStorage.getItem("mlStartLang") || {
			value: "EN",
			label: "English",
		},
	);

	const langOptions = ref([
		{ value: "EN", label: "English" },
		{ value: "DE", label: "German" },
		{ value: "EL", label: "Greek" },
		{ value: "SV", label: "Swedish" },
		{ value: "AR", label: "Arabic" },
	]);

	const mlIncludeEnglish = ref(!!SessionStorage.getItem("mlIncludeEnglish"));
	const mlIncludeArabic = ref(!!SessionStorage.getItem("mlIncludeArabic"));
	const mlIncludeGerman = ref(!!SessionStorage.getItem("mlIncludeGerman"));
	const mlIncludeGreek = ref(!!SessionStorage.getItem("mlIncludeGreek"));
	const mlIncludeSwedish = ref(!!SessionStorage.getItem("mlIncludeSwedish"));

	if (
		!mlIncludeArabic.value &&
		!mlIncludeGerman.value &&
		!mlIncludeGreek.value &&
		!mlIncludeSwedish.value
	) {
		mlIncludeGerman.value = true;
		mlIncludeGreek.value = true;
		mlIncludeSwedish.value = true;
	}

	if (!includeGerman.value && !includeSwedish.value && !includeArabic.value) {
		includeSwedish.value = true;
	}

	watch(segments, () => {
		enabledSegments.value = segments.value.map((segment) => segment.value);
	});

	watch(
		[
			includeGerman,
			includeSwedish,
			includeArabic,
			questionMode,
			enabledSegments,
			mlStartLang,
			mlIncludeEnglish,
			mlIncludeArabic,
			mlIncludeGerman,
			mlIncludeGreek,
			mlIncludeSwedish,
		],
		() => {
			SessionStorage.set("includeGerman", includeGerman.value);
			SessionStorage.set("includeSwedish", includeSwedish.value);
			SessionStorage.set("includeArabic", includeArabic.value);
			SessionStorage.set("questionMode", questionMode.value);
			SessionStorage.set("enabledSegments", enabledSegments.value);
			SessionStorage.set("mlStartLang", mlStartLang.value);
			SessionStorage.set("mlIncludeEnglish", mlIncludeEnglish.value);
			SessionStorage.set("mlIncludeArabic", mlIncludeArabic.value);
			SessionStorage.set("mlIncludeGerman", mlIncludeGerman.value);
			SessionStorage.set("mlIncludeGreek", mlIncludeGreek.value);
			SessionStorage.set("mlIncludeSwedish", mlIncludeSwedish.value);
		},
		{ immediate: true },
	);

	return {
		includeGerman,
		includeSwedish,
		includeArabic,
		mlStartLang,
		langOptions,
		mlIncludeEnglish,
		mlIncludeGerman,
		mlIncludeSwedish,
		mlIncludeArabic,
		mlIncludeGreek,
		questionMode,
		enabledSegments,
	};
});
