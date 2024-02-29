<script lang="ts">
	import { onMount } from 'svelte';
	import { toggleDarkMode, isDarkMode } from '$lib/utils/darkmode';
	import { writable } from 'svelte/store';

	export let checked:boolean;
	export const darkMode = writable({isDarkMode: false});

	let bg_sun: string;
	let bg_moon: string;
	let color_sun: string;
	let color_moon: string;


	onMount(() => {
		checked = isDarkMode();
	});

	function changeToLight() {
		if (checked) {
			toggleDarkMode(false);
			checked = false;
			$darkMode = {isDarkMode: false};
		}
	}

	function changeToDark() {
		if (!checked) {
			toggleDarkMode(true);
			checked = true;
			$darkMode = {isDarkMode: true};
		}
	}

	$: if (checked === false) {
		bg_sun = 'bg-t-indigo';
		color_sun = '#FFFFFF';
		bg_moon = 'bg-white';
		color_moon = '#5236DD';
	} else {
		bg_sun = 'bg-t-black';
		color_sun = '#99B4FF';
		bg_moon = 'bg-t-ciel';
		color_moon = '#1F1F23';
	}

</script>

<div class="flex items-center shrink-0">
	<button
		type="button"
		class="border rounded-full border-t-indigo dark:border-t-ciel mr-1"
		on:click={changeToLight}
		aria-label="Changer pour le mode clair"
	>
		<svg
			class={`w-5 h-5 rounded-full p-1 ${bg_sun}`}
			id="Calque_1"
			data-name="Calque 1"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 32 32"
		>
			<circle
				cx="16"
				cy="16"
				r="6.49"
				fill="none"
				stroke={color_sun}
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
			/>
			<line
				x1="16"
				y1="1.87"
				x2="16"
				y2="6.1"
				fill="none"
				stroke={color_sun}
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
			/>
			<line
				x1="16"
				y1="25.9"
				x2="16"
				y2="30.13"
				fill="none"
				stroke={color_sun}
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
			/>
			<line
				x1="30.13"
				y1="16"
				x2="25.9"
				y2="16"
				fill="none"
				stroke={color_sun}
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
			/>
			<line
				x1="6.1"
				y1="16"
				x2="1.87"
				y2="16"
				fill="none"
				stroke={color_sun}
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
			/>
			<line
				x1="25.99"
				y1="6.01"
				x2="23"
				y2="9"
				fill="none"
				stroke={color_sun}
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
			/>
			<line
				x1="9"
				y1="23"
				x2="6.01"
				y2="25.99"
				fill="none"
				stroke={color_sun}
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
			/>
			<line
				x1="25.99"
				y1="25.99"
				x2="23"
				y2="23"
				fill="none"
				stroke={color_sun}
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
			/>
			<line
				x1="9"
				y1="9"
				x2="6.01"
				y2="6.01"
				fill="none"
				stroke={color_sun}
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
			/>
		</svg>
	</button>
	<button
		type="button"
		class="border rounded-full border-t-indigo dark:border-t-ciel"
		on:click={changeToDark}
		aria-label="Changer pour le mode sombre"
	>
		<svg
			class={`w-5 h-5 rounded-full p-1 ${bg_moon} `}
			id="Calque_1"
			data-name="Calque 1"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 32 32"
		>
			<path
				d="M17.94,16.01c0-5.65,3.33-10.52,8.13-12.78-1.82-.86-3.85-1.35-6-1.35-7.8,0-14.13,6.33-14.13,14.13s6.33,14.13,14.13,14.13c2.15,0,4.18-.49,6-1.35-4.8-2.26-8.13-7.12-8.13-12.78Z"
				fill="none"
				opacity=".99"
				stroke={color_moon}
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
			/>
		</svg>
	</button>
</div>
