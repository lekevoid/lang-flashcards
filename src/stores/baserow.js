import { ref } from "vue";
import { axios } from "boot/axios";
import { defineStore } from "pinia";

export const useBaserowStore = defineStore("baserow", () => {
	const out = ref("Hello");
	const swedish = ref([]);

	console.log(process.env.BASEROW_TOKEN);

	async function fetchSwedish() {
		await axios({
			method: "GET",
			url: "https://api.baserow.io/api/database/rows/table/216913/?user_field_names=true",
			headers: {
				Authorization: `Token ${process.env.BASEROW_TOKEN}`,
			},
		}).then((res) => {
			console.log(res.data.results);
			swedish.value = res.data.results;
		});
	}

	if (swedish.value.length === 0) {
		fetchSwedish();
	}

	return { out, swedish };
});
