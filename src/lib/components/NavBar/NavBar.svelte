<script lang="ts">
	import ToggleDarkMode from './toggleDarkMode.svelte';
	import NavBarLanguage from './NavBarLanguage.svelte';
	import { _ } from 'svelte-i18n';
	import { page } from '$app/stores';
	import logoClassic from '$assets/Elements_graphiques/Logo - light.svg';
	import logoClassicDark from '$assets/Elements_graphiques/Logo - dark.svg';
	import logoPowered from '$assets/Elements_graphiques/Logo_light.svg';
	import logoPoweredDark from '$assets/Elements_graphiques/Logo_dark.svg';
	import NavBarMenu from './NavBarMenu.svelte';

	let logo: string;
	let text: string;

	let checked: boolean = false;

	let isMenuOpen: boolean;

	console.log('NavBar Page = ', $page.url.pathname);

	$: {
		if ($page.url.pathname == '/' || $page.url.pathname == '') {
			logo = checked ? logoPoweredDark : logoPowered;
			text = 'Powered by';
			isMenuOpen = false;
		} else {
			logo = checked ? logoClassicDark : logoClassic;
			text = 'QR Code Generator';
			isMenuOpen = true;
		}
	}
</script>

<nav
	class="sticky top-0 z-20 bg-white w-full p-0  flex flex-col justify-between mb-2 dark:bg-t-black lg:h-full
	sm:h-full"
>
	<div class="flex w-full">
		<div class="flex items-center justify-between py-2 px-2 sm:px-4  w-full h-full   dark:text-white">
			{#if $page.url.pathname == '/' || $page.url.pathname == ''}
				<div class="flex items-center">
					<p class="text-base font-semibold">{text}</p>
					<img src={logo} alt="logo" class="w-20 ml-2 mt-1" />
				</div>
			{:else}
				<div class="flex items-center">
					<img src={logo} alt="logo" class="w-7 mt-1" />
					<p class="font-semibold text-sm ml-2">{text}</p>
				</div>
			{/if}
			{#if $page.url.pathname == '/' || $page.url.pathname == ''}
				<p class="test text-[10px] ml-3 lg:text-[15px]">
					Affichage dynamique et interactif pour tous vos ecran
					<span class="text-t-indigo font-bold">>></span>
				</p>
			{/if}
			<div class="hidden sm:block">
				<NavBarMenu />
			</div>
			<div class="flex items-center justify-center h-full">
				<span class="hidden mr-2 text-xs sm:block">Powered by </span>
				<img src={checked ? logoPoweredDark : logoPowered} alt="logo" class="hidden w-16 mt-1 sm:block mr-3" />
				<div class="flex ">
					<NavBarLanguage />
					<ToggleDarkMode bind:checked />
				</div>
			</div>
			
		</div>
	</div>

	{#if isMenuOpen === true}
		<div class="bg-t-indigo text-white dark:bg-t-ciel dark:text-t-black sm:hidden">
			<NavBarMenu />
		</div>
	{/if}
</nav>

<style>
	@media (max-width: 425px) {
		.test {
			display: none;
		}
	}
</style>
