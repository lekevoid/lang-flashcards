import { ref, computed } from "vue";
import { axios } from "boot/axios";
import { defineStore } from "pinia";
import { slugify } from "../composables/useTextHelper";

export const useBaserowStore = defineStore("baserow", () => {
	const dico = ref([]);

	async function fetchAllDicoPages(baseUrl, resultArray) {
		let page = 1;
		let hasMore = true;

		while (hasMore) {
			const response = await axios({
				method: "GET",
				url: `${baseUrl}&page=${page}&size=200`,
				headers: {
					Authorization: `Token ${process.env.BASEROW_TOKEN}`,
				},
			});

			resultArray.push(
				...response.data.results.map((r) => ({
					...r,
					Segments: r.Segments.map((s) => s.value),
				})),
			);

			hasMore = response.data.next !== null;
			page++;
		}
	}

	async function fetchDico() {
		dico.value = [];
		await fetchAllDicoPages(
			"https://api.baserow.io/api/database/rows/table/481699/?user_field_names=true",
			dico.value,
		);
	}

	const allSegments = computed(() => {
		return [
			...new Set(dico.value.map((e) => [...e.Segments]).flat()),
		].sort();
	});

	const allLangs = computed(() => {
		if (dico.value.length > 0) {
			return Object.keys(dico.value[0]).filter(
				(key) => key !== "id" && key.match(/^\w{2}$/),
			);
		}

		return [];
	});

	if (dico.value.length === 0) {
		fetchDico();
	}

	return { dico, allSegments, allLangs };
});
