import { ref } from "vue";
import { axios } from "boot/axios";
import { defineStore } from "pinia";
import { slugify } from "../composables/useTextHelper";

export const useMultilangStore = defineStore("multilang", () => {
	const multilang = ref([]);

	async function fetchMultilang() {
		await axios({
			method: "GET",
			url: "https://api.baserow.io/api/database/rows/table/481699/?user_field_names=true&size=200&filter__Active__equal=true",
			headers: {
				Authorization: `Token ${process.env.BASEROW_TOKEN}`,
			},
		}).then((res) => {
			multilang.value = res.data.results;
		});
	}

	if (multilang.value.length === 0) {
		fetchMultilang();
	}

	return { multilang };
});
