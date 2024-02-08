<script lang="ts">
    import ToggleDarkMode from './toggleDarkMode.svelte';
	import NavBarLanguage from './NavBarLanguage.svelte';
	import { _ } from 'svelte-i18n';
	import { page } from '$app/stores';
	import { darkMode, isDarkMode } from '$lib/utils/darkmode';

	import logoClassic from '$assets/Elements_graphiques/Logo - light.svg';
    import logoClassicDark from '$assets/Elements_graphiques/Logo - dark.svg';
	import logoPowered from '$assets/Elements_graphiques/Logo_light.svg';
    import logoPoweredDark from '$assets/Elements_graphiques/Logo_dark.svg';

	let logo: string;
	let text: string;

    let checked:boolean = false;

	let isMenuOpen: boolean;

    console.log('NavBar Page = ', $page.url.pathname);

    $: {
        if ($page.url.pathname === '/') {
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
	class="sticky top-0 z-20 bg-white w-full p-0 md:p-4 sm:h-16 flex flex-col justify-between mb-2 dark:bg-t-black"
>
	<div class="flex justify-between">
		<div class="flex items-center justify-around ml-4 py-2 dark:text-white">
			{#if $page.url.pathname === '/'}
				<p class="text-base font-semibold ">{text}</p>
				<img src={logo} alt="logo" class="w-20 ml-2 mt-1" />
			{:else}
				<img src={logo} alt="logo" class="w-7 mt-1" />
				<p class="font-semibold text-sm ml-2 ">{text}</p>
			{/if}
		</div>

		<div class="flex items-center mr-2">
			<NavBarLanguage />
			<ToggleDarkMode  bind:checked={checked} />
		</div>
	</div>

	{#if isMenuOpen === true}
		<div
			class="flex bg-t-indigo h-12 items-center w-full justify-around text-white text-[10px] dark:bg-t-ciel dark:text-t-black"
		>
			<div class="flex">
				<div class="flex-col items-center flex">
					<a href="/createQr/" class="py-1 px-2" class:font-bold={$page.url.pathname === '/createQr/'}>{$_('saved.add')}</a>
					{#if $page.url.pathname === '/createQr/'}
                        <span class="bg-white w-1 h-1 rounded-full dark:bg-t-black"></span>
					{/if}
				</div>
				<div class="flex-col items-center flex">
					<a href="/mylist/" class=" py-1 px-2" class:font-bold={$page.url.pathname === '/mylist/'}>{$_('saved.title')}</a>
					{#if $page.url.pathname === '/mylist/'}
                    <span class="bg-white w-1 h-1 rounded-full dark:bg-t-black"></span>
					{/if}
				</div>
				<div class="flex-col items-center flex">
					<a href="/scanqr/" class="py-1 px-2" class:font-semibold={$page.url.pathname === '/scanqr/'}>{$_('scan')}</a>
					{#if $page.url.pathname === '/scanqr/'}
                        <span class="bg-white w-1 h-1 rounded-full dark:bg-t-black"></span>
					{/if}
				</div>
			</div>
		</div>
	{/if}
</nav>
