<template>
	<q-list>
		<q-item-label header>Settings</q-item-label>
		<q-item>
			<q-item-section>
				<q-toggle v-model="includeArabic" label="Arabic" />
			</q-item-section>
			<q-item-section avatar>
				<q-avatar size="md">
					<img
						src="../assets/arabic.png"
						:class="[{ disabled: !includeArabic }]"
					/>
				</q-avatar>
			</q-item-section>
		</q-item>
		<q-item>
			<q-item-section>
				<q-toggle v-model="includeSwedish" label="Swedish" />
			</q-item-section>
			<q-item-section avatar>
				<q-avatar size="md">
					<img
						src="../assets/swedish.png"
						:class="[{ disabled: !includeSwedish }]"
					/>
				</q-avatar>
			</q-item-section>
		</q-item>
		<q-item-label header>Question Mode</q-item-label>
		<q-item>
			<q-toggle
				v-model="questionMode"
				:label="questionMode"
				color="blue"
				checked-icon="check"
				unchecked-icon="clear"
				false-value="term"
				true-value="translation"
				keep-color
			/>
		</q-item>
	</q-list>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useSettingsStore } from "stores/settings";

// const icon_arabic = require();
// const icon_swedish = require("./swedish.png");

const { includeArabic, includeSwedish, questionMode } = storeToRefs(
	useSettingsStore(),
);
</script>

<style lang="scss" scoped>
img {
	transition: filter 0.3s;
	&.disabled {
		filter: grayscale(1);
	}
}
</style>
