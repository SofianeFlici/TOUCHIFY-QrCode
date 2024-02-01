<script lang="ts">
    import logo from "$assets/logo/9043004_scan_qr_code_icon.svg";
    import ToggleDarkMode from "./toggleDarkMode.svelte";
    import NavBarLanguage from "./NavBarLanguage.svelte";
    import {_} from "svelte-i18n";
    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
    }

</script>
<nav class="sticky top-0 z-20 w-full bg-slate-600 dark:bg-slate-950 p-2 md:p-4 sm:h-16 flex justify-between items-center text-xs">
    <div class="flex items-center">
        <img src={logo} alt="logo" class="w-7 h-7" />
        <a href="/" class="text-white font-bold py-1 px-2">QR Code Generator</a>
    </div>

    <div class="flex items-center">
        <div class="hidden md:flex mr-6 text-xs">
            <a href="/" class="text-white font-bold py-1 px-2 hover:text-slate-800 dark:hover:text-slate-600">{$_("saved.add")}</a>
            <a href="/scanqr" class="text-white font-bold py-1 px-2 hover:text-slate-800 dark:hover:text-slate-600">{$_("scan")}</a>
            <a href="/mylist" class="text-white font-bold py-1 px-2 hover:text-slate-800 dark:hover:text-slate-600">{$_("saved.title")}</a>
        </div>
        <ToggleDarkMode />
        <NavBarLanguage />
        <button class="md:hidden ml-3 text-white" on:click={toggleMenu}>
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
        </button>
    </div>

    <div class={`flex flex-col md:hidden ${isMenuOpen ? 'block' : 'hidden'} absolute top-16 top-right right-0 rounded justify-center items-center text-xs bg-slate-600 dark:bg-slate-950 w-44`}>
        <a href="/" class="text-white font-bold py-1 px-2 hover:text-slate-800 dark:hover:text-slate-600">{$_("saved.add")}</a>
        <a href="/scanqr" class="text-white font-bold py-1 px-2 hover:text-slate-800 dark:hover:text-slate-600">{$_("scan")}</a>
        <a href="/mylist" class="text-white font-bold py-1 px-2 hover:text-slate-800 dark:hover:text-slate-600">{$_("saved.title")}</a>
    </div>
</nav>