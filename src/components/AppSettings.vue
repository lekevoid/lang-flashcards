<template>
	<q-list class="app_settings">
		<q-item-label header>From</q-item-label>
		<q-item>
			<q-avatar
				size="md"
				class="lang_toggle q-mr-md"
				v-for="lang in allLangs"
				@click="toggleFromLang(lang)"
				:key="lang"
			>
				<img
					:src="`/langs/${lang}.png`"
					:class="[{ disabled: !fromLangs.includes(lang) }]"
				/>
			</q-avatar>
		</q-item>
		<q-item-label header>To</q-item-label>
		<q-item>
			<q-avatar
				size="md"
				class="lang_toggle q-mr-md"
				v-for="lang in allLangs"
				@click="toggleToLang(lang)"
				:key="lang"
			>
				<img
					:src="`/langs/${lang}.png`"
					:class="[{ disabled: !toLangs.includes(lang) }]"
				/> </q-avatar
		></q-item>
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
					</div> </template
			></q-option-group>
		</q-item>
	</q-list>
	<pre class="console"></pre>
</template>

<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useSettingsStore } from "stores/settings";

const { fromLangs, toLangs, allSegments, enabledSegments, allLangs } =
	storeToRefs(useSettingsStore());
const { toggleFromLang, toggleToLang } = useSettingsStore();

const displaySegments = computed(() => {
	return allSegments.value.map((s) => ({
		label: s,
		value: s,
	}));
});
</script>

<style lang="scss">
.app_settings {
	.lang_toggle {
		cursor: pointer;

		img {
			transition: filter 0.3s;

			&.disabled {
				filter: grayscale(1);
				cursor: pointer !important;
			}
		}
	}

	.q-option-group,
	.q-toggle {
		width: 100%;
		flex: 0 0 100%;
	}

	.q-toggle__label {
		width: 100%;
	}
}
</style>
