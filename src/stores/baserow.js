import { ref } from "vue";
import { axios } from "boot/axios";
import { defineStore } from "pinia";
import { slugify } from "../composables/useTextHelper";

export const useBaserowStore = defineStore("baserow", () => {
	const arabic = ref([]);
	const german = ref([]);
	const swedish = ref([]);
	const segments = ref([]);

	async function fetchArabic() {
		await axios({
			method: "GET",
			url: "https://api.baserow.io/api/database/rows/table/216936/?user_field_names=true",
			headers: {
				Authorization: `Token ${process.env.BASEROW_TOKEN}`,
			},
		}).then((res) => {
			arabic.value = res.data.results;
		});
	}

	async function fetchGerman() {
		await axios({
			method: "GET",
			url: "https://api.baserow.io/api/database/rows/table/248192/?user_field_names=true",
			headers: {
				Authorization: `Token ${process.env.BASEROW_TOKEN}`,
			},
		}).then((res) => {
			german.value = res.data.results;
		});
	}

	async function fetchSwedish() {
		await axios({
			method: "GET",
			url: "https://api.baserow.io/api/database/rows/table/216913/?user_field_names=true",
			headers: {
				Authorization: `Token ${process.env.BASEROW_TOKEN}`,
			},
		}).then((res) => {
			swedish.value = res.data.results;
		});
	}

	async function fetchSegments() {
		await axios({
			method: "GET",
			url: "https://api.baserow.io/api/database/rows/table/246594/?user_field_names=true",
			headers: {
				Authorization: `Token ${process.env.BASEROW_TOKEN}`,
			},
		}).then((res) => {
			segments.value = res.data.results
				.map((s) => ({
					label: s.Name,
					value: slugify(s.Name),
				}))
				.sort((a, b) => a.label.localeCompare(b.label));
		});
	}

	if (arabic.value.length === 0) {
		fetchArabic();
	}

	if (german.value.length === 0) {
		fetchGerman();
	}

	if (swedish.value.length === 0) {
		fetchSwedish();
	}

	if (segments.value.length === 0) {
		fetchSegments();
	}

	return { arabic, german, swedish, segments };
});
