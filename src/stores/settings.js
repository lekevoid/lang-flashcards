import { ref } from "vue";
import { defineStore } from "pinia";

export const useSettingsStore = defineStore("settings", () => {
	const includeArabic = ref(false);
	const includeSwedish = ref(true);
	const questionMode = ref("term");

	/* function toggleIncludeArabic() {
		includeArabic.value = !includeArabic.value;
	}

	function toggleIncludeSwedish() {
		includeSwedish.value = !includeSwedish.value;
	} */

	return {
		includeArabic,
		includeSwedish,
		questionMode,
		/* toggleIncludeArabic,
		toggleIncludeSwedish, */
	};
});
