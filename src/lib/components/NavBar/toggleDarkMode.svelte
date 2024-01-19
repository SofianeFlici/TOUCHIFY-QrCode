<script lang="ts">
	import Switch from '../Switch.svelte';
	import Moon_Icon from '$assets/darkMode/moon_icon.png';
	import Sun_Icon from '$assets/darkMode/sun_icon.png';
	import { onMount } from 'svelte';
	import { toggleDarkMode, isDarkMode } from '$lib/utils/darkmode';
	let checked = false;

	onMount(() => {
		checked = isDarkMode();
	});
</script>

<div class="flex items-center">
	<img src={Sun_Icon} alt={'light'} class="w-5 h-5 mr-2" />
	<Switch bind:checked onchange={toggleDarkMode} />
	<img src={Moon_Icon} alt={'dark'} class="w-7 h-7 mr-2" />
</div>
