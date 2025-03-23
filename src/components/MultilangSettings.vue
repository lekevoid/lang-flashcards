<template>
	<q-list class="app_settings">
		<q-item-label header>Start Language</q-item-label>
		<q-item>
			<q-item-section>
				<q-select
					outlined
					v-model="mlStartLang"
					:options="langOptions"
					label="Start Language"
				/>
			</q-item-section>
		</q-item>
		<q-item-label header>Translation Languages</q-item-label>
		<q-item v-if="mlStartLang.value !== 'EN'" class="q-py-none" dense>
			<q-item-section>
				<q-toggle v-model="mlIncludeEnglish" label="English" />
			</q-item-section>
			<q-item-section avatar>
				<q-avatar size="24px">
					<img
						src="../assets/english.png"
						:class="[{ disabled: !mlIncludeEnglish }]"
					/>
				</q-avatar>
			</q-item-section>
		</q-item>
		<q-item v-if="mlStartLang.value !== 'AR'" class="q-py-none" dense>
			<q-item-section>
				<q-toggle v-model="mlIncludeArabic" label="Arabic" />
			</q-item-section>
			<q-item-section avatar>
				<q-avatar size="24px">
					<img
						src="../assets/arabic.png"
						:class="[{ disabled: !mlIncludeArabic }]"
					/>
				</q-avatar>
			</q-item-section>
		</q-item>
		<q-item v-if="mlStartLang.value !== 'DE'" class="q-py-none" dense>
			<q-item-section>
				<q-toggle v-model="mlIncludeGerman" label="German" />
			</q-item-section>
			<q-item-section avatar>
				<q-avatar size="24px">
					<img
						src="../assets/german.png"
						:class="[{ disabled: !mlIncludeGerman }]"
					/>
				</q-avatar>
			</q-item-section>
		</q-item>
		<q-item v-if="mlStartLang.value !== 'EL'" class="q-py-none" dense>
			<q-item-section>
				<q-toggle v-model="mlIncludeGreek" label="Greek" />
			</q-item-section>
			<q-item-section avatar>
				<q-avatar size="24px">
					<img
						src="../assets/greek.png"
						:class="[{ disabled: !mlIncludeGreek }]"
					/>
				</q-avatar>
			</q-item-section>
		</q-item>
		<q-item v-if="mlStartLang.value !== 'SV'" class="q-py-none" dense>
			<q-item-section>
				<q-toggle v-model="mlIncludeSwedish" label="Swedish" />
			</q-item-section>
			<q-item-section avatar>
				<q-avatar size="24px">
					<img
						src="../assets/swedish.png"
						:class="[{ disabled: !mlIncludeSwedish }]"
					/>
				</q-avatar>
			</q-item-section>
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
							size="24px"
							@click.stop="enabledSegments = [opt.value]"
						/>
					</div>
				</template>
			</q-option-group>
		</q-item>
	</q-list>
	<pre class="console"></pre>
</template>

<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useBaserowStore } from "stores/baserow";
import { useDeckStore } from "stores/deck";
import { useSettingsStore } from "stores/settings";

const { segments } = storeToRefs(useBaserowStore());
const { mlUsedSegments } = storeToRefs(useDeckStore());
const {
	enabledSegments,
	mlStartLang,
	langOptions,
	mlIncludeEnglish,
	mlIncludeGerman,
	mlIncludeSwedish,
	mlIncludeArabic,
	mlIncludeGreek,
} = storeToRefs(useSettingsStore());

const displaySegments = computed(() =>
	segments.value.filter((segment) =>
		mlUsedSegments.value.includes(segment.label),
	),
);
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
