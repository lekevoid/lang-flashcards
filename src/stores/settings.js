import { ref, watch } from "vue";
import { defineStore, storeToRefs } from "pinia";
import { SessionStorage } from "quasar";

import { useBaserowStore } from "stores/baserow";

export const useSettingsStore = defineStore("settings", () => {
	const { segments } = storeToRefs(useBaserowStore());

	const includeGerman = ref(SessionStorage.getItem("includeGerman") || false);
	const includeSwedish = ref(
		SessionStorage.getItem("includeSwedish") || true,
	);
	const includeArabic = ref(SessionStorage.getItem("includeArabic") || false);
	const questionMode = ref(SessionStorage.getItem("questionMode") || "term");
	const enabledSegments = ref(
		SessionStorage.getItem("enabledSegments") || [],
	);

	const mlStartLang = ref({ value: "EN", label: "English" });
	const langOptions = ref([
		{ value: "EN", label: "English" },
		{ value: "DE", label: "German" },
		{ value: "EL", label: "Greek" },
		{ value: "SV", label: "Swedish" },
		{ value: "AR", label: "Arabic" },
	]);
	const mlIncludeEnglish = ref(true);
	const mlIncludeArabic = ref(false);
	const mlIncludeGerman = ref(true);
	const mlIncludeGreek = ref(true);
	const mlIncludeSwedish = ref(true);

	watch(segments, () => {
		enabledSegments.value = segments.value.map((segment) => segment.value);
	});

	watch(includeGerman, (newVal) => {
		SessionStorage.set("includeGerman", newVal);
	});

	watch(includeSwedish, (newVal) => {
		SessionStorage.set("includeSwedish", newVal);
	});

	watch(includeArabic, (newVal) => {
		SessionStorage.set("includeArabic", newVal);
	});

	watch(questionMode, (newVal) => {
		SessionStorage.set("questionMode", newVal);
	});

	watch(enabledSegments, (newVal) => {
		SessionStorage.set("enabledSegments", newVal);
	});

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
