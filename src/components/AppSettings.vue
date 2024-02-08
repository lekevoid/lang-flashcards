<template>
	<q-list class="app_settings">
		<q-item-label header>Settings</q-item-label>
		<q-item>
			<q-item-section>
				<q-toggle v-model="includeGerman" label="German" />
			</q-item-section>
			<q-item-section avatar>
				<q-avatar size="md">
					<img
						src="../assets/german.png"
						:class="[{ disabled: !includeGerman }]"
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
		<q-item-label header>Segments</q-item-label>
		<q-item>
			<q-option-group
				v-model="enabledSegments"
				:options="displaySegments"
				color="blue"
				type="toggle"
			>
				<template v-slot:label="opt">
					<div class="row items-center justify-between">
						<span>{{ opt.label }}</span>
						<q-icon
							name="ads_click"
							color="white"
							size="2em"
							@click.stop="enabledSegments = [opt.value]"
						/>
					</div>
				</template>
			</q-option-group>
		</q-item>
	</q-list>
	<pe>{{ chosenSegments }}</pe>
</template>

<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useBaserowStore } from "stores/baserow";
import { useDeckStore } from "stores/deck";
import { useSettingsStore } from "stores/settings";

const { segments } = storeToRefs(useBaserowStore());
const { usedSegments } = storeToRefs(useDeckStore());

// console.log(usedSegments.value);

const displaySegments = computed(() =>
	segments.value.filter((segment) =>
		usedSegments.value.includes(segment.label),
	),
);

const {
	includeArabic,
	includeGerman,
	includeSwedish,
	questionMode,
	enabledSegments,
} = storeToRefs(useSettingsStore());
</script>

<style lang="scss">
.app_settings {
	.q-option-group,
	.q-toggle {
		width: 100%;
		flex: 0 0 100%;
	}

	.q-toggle__label {
		width: 100%;
	}

	img {
		transition: filter 0.3s;
		&.disabled {
			filter: grayscale(1);
		}
	}
}
</style>
