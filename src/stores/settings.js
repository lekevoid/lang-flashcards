import { ref } from "vue";
import { defineStore } from "pinia";

export const useSettingsStore = defineStore("settings", () => {
	const includeArabic = ref(false);
	const includeSwedish = ref(false);

	function toggleIncludeArabic() {
		includeArabic.value = !includeArabic.value;
	}

	function toggleIncludeSwedish() {
		includeSwedish.value = !includeSwedish.value;
	}

	return {
		includeArabic,
		includeSwedish,
		toggleIncludeArabic,
		toggleIncludeSwedish,
	};
});
