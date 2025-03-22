<template>
	<q-layout view="lHh Lpr lFf">
		<q-header elevated>
			<q-toolbar>
				<q-btn
					flat
					dense
					round
					icon="settings"
					aria-label="Menu"
					@click="toggleLeftDrawer"
				/>

				<q-toolbar-title>Languages Flashcards</q-toolbar-title>

				<a href="/">
					<q-icon
						name="flip"
						color="white"
						size="24px"
						@click.stop="enabledSegments = [opt.value]"
					/>
				</a>
			</q-toolbar>
		</q-header>

		<q-drawer v-model="leftDrawerOpen" bordered>
			<MultilangSettings />
		</q-drawer>

		<q-page-container>
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script setup>
import { ref } from "vue";
import MultilangSettings from "components/MultilangSettings.vue";

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
	leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
