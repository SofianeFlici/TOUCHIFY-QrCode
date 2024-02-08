<script lang="ts">
	import { onMount } from 'svelte';
	import { locale } from 'svelte-i18n';
	import fr_icon from '$assets/trad/france_icon.png';
	import uk_icon from '$assets/trad/kindgom_gb_gbr_icon.png';
	import { _ } from 'svelte-i18n';

	const lang = [
		{ id: 'en', name: 'en', img: uk_icon },
		{ id: 'fr', name: 'fr', img: fr_icon }
	];

	let isOpen = false;

	function changeLocale(newLocale: string) {
		$locale = newLocale;
		localStorage.setItem('locale', newLocale);
	}

	onMount(() => {
		let storedLocale = localStorage.getItem('locale');
		if (storedLocale) {
			if (navigator.language.startsWith('fr')) {
				storedLocale = 'fr';
			} else {
				storedLocale = 'en';
			}
			$locale = storedLocale;
		}
	});
</script>

{#if $locale === 'fr'}
	<button class="mr-1" on:click={() => (isOpen = true)}>
		<img src={fr_icon} alt="France" class="w-5 h-5 rounded-full bg-indigo-600" />
	</button>
{:else}
	<button class="mr-1" on:click={() => (isOpen = !isOpen)}>
		<img src={uk_icon} alt="United Kingdom" class="w-5 h-5 rounded-full bg-indigo-600" />
	</button>
{/if}

{#if isOpen}
	<div class="flex flex-col fixed top-14 bg-slate-500 right-4 justify-between w-36 rounded-md">
		{#each lang as { id, name, img }}
			<div class="flex row w-4/6">
				<button
					class="flex w-full justify-between m-2 text-white"
					on:click={() => {
						changeLocale(id);
						isOpen = false;
					}}
				>
					<img src={img} alt={name} class="w-6 h-6" />
					{$_(`ui.lang.${name}`)}
				</button>
			</div>
		{/each}
	</div>
{/if}
