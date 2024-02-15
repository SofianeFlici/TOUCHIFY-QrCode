<script lang="ts">
	import { page } from '$app/stores';
	import { _ } from 'svelte-i18n';
	import { NavbarMenu } from '$lib/utils/navBar';

	const Navbar_menu = NavbarMenu();
</script>

<div
	class="flex  h-12 items-center w-full justify-around  text-[10px] "
>
	<div class="flex">
		{#each Navbar_menu as menu}
			<div class="flex-col items-center flex justify-center">
				<a href={menu.href} class="py-1 px-2 sm:mr-5 {($page.url.pathname === menu.href ? 'text-t-indigo' : 'text-black')} font-semibold sm:text-[14px] dark:text-white">{$_(menu.trad)}</a>
				{#if $page.url.pathname === menu.href}
					<span class="bg-white w-1 h-1 rounded-full dark:bg-t-black sm:bg-t-indigo dark:sm:bg-white"></span>
				{/if}
			</div>
		{/each}
	</div>
</div>
