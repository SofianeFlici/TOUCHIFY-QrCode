<script lang="ts">
	import { page } from '$app/stores';
	import { _ } from 'svelte-i18n';
	import { NavbarMenu } from '$lib/utils/navBar';

	const Navbar_menu = NavbarMenu();
</script>

<div class="flex h-12 items-center w-full justify-around">
	<div class="flex">
		{#each Navbar_menu as menu}
			<div class="flex-col items-center flex justify-center">
				<a
  href={menu.href}
  class="py-1 px-2 sm:mr-5 {($page.url.pathname === menu.href || $page.url.pathname.startsWith(menu.href + '/')) && $page.url.pathname !== '/' ? 'text-white sm:text-t-indigo dark:sm:text-t-ciel dark:text-t-black' : 'text-white sm:text-black dark:text-white'} font-semibold text-[10px] sm:text-[12px]"
>{$_(menu.trad)}</a>

				{#if $page.url.pathname === menu.href || $page.url.pathname.startsWith(menu.href + '/')}
					<span
						class="sm:mr-5 bg-white w-1 h-1 rounded-full dark:bg-t-black sm:bg-t-indigo dark:sm:bg-white"
					></span>
				{/if}
			</div>
		{/each}
	</div>
</div>
