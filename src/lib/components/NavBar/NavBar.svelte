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

	$: {
		if ($page.url.pathname == '/' || $page.url.pathname == '') {
			logo = checked ? logoPoweredDark : logoPowered;
			text = 'poweredby';
			isMenuOpen = false;
		} else {
			logo = checked ? logoClassicDark : logoClassic;
			text = 'QR Code Generator';
			isMenuOpen = true;
		}
	}
</script>

<nav
	class="{$page.url.pathname === '' || $page.url.pathname === '/' ? 'fixed' : 'sticky'} top-0 z-20 bg-white right-0 left-0 p-0 flex flex-col justify-center dark:bg-t-black
"
>
	<div
		class="flex w-full {$page.url.pathname !== '' && $page.url.pathname !== '/'
			? 'sm:h-16'
			: ''}  justify-between p-2"
	>
		<div
			class="flex {$page.url.pathname == '' || $page.url.pathname == '/'
				? 'sm:w-[70%]'
				: ''}  h-full shrink-0"
		>
			{#if $page.url.pathname == '/' || $page.url.pathname == ''}
				<div class="flex items-center h-[100%]">
					<p
						class="text-xs font-semibold
					dark:text-white"
					>
						{$_(`navbar.${text}`)}
					</p>
					<img src={logo} alt="logo" class="w-20 ml-2 mt-1" />
				</div>
			{:else}
				<div class="flex items-center">
					<img src={logo} alt="logo" class="w-7" />
					<p class="font-semibold text-sm ml-2 dark:text-white">{text}</p>
				</div>
			{/if}
			{#if $page.url.pathname == '/' || $page.url.pathname == ''}
				<a href="https://www.touchify.io" class="bg-red-400">

					<p
						class="hidden text-[10px] sm:block sm:ml-4 sm:mt-1 sm:text-[12px] lg:w-80
					dark:text-white"
					>
						{$_('navbar.slogan')}
						<span class="text-t-indigo font-bold dark:text-t-ciel">>></span>
					</p>
				</a>
			{/if}
		</div>
		{#if $page.url.pathname !== '/' && $page.url.pathname !== ''}
			<div class="hidden sm:block">
				<NavBarMenu />
			</div>
		{/if}
		<div class=" flex items-center shrink-0 sm:mr-2 sm:justify-between">
			{#if $page.url.pathname !== '/' && $page.url.pathname !== ''}
				<div class="flex">
					<span class="hidden text-xs sm:mr-2 lg:block dark:text-white">
						{$_('navbar.poweredby')}
					</span>
					<img
						src={checked ? logoPoweredDark : logoPowered}
						alt="logo"
						class="hidden h-4 mt-[2px] lg:block mr-3"
					/>
				</div>
			{/if}

			<div class="flex">
				<NavBarLanguage />
				<ToggleDarkMode bind:checked />
			</div>
		</div>
	</div>

	{#if isMenuOpen === true}
		<div class="bg-t-indigo text-white dark:bg-t-ciel dark:text-t-black sm:hidden">
			<NavBarMenu />
		</div>
	{/if}
</nav>