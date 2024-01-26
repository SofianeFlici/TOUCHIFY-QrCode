<script lang="ts">
    import logo from "$assets/logo/9043004_scan_qr_code_icon.svg";
    import ToggleDarkMode from "./toggleDarkMode.svelte";
    import NavBarLanguage from "./NavBarLanguage.svelte";
    import {_} from "svelte-i18n";

</script>

<nav class="sticky text-sm top-0 z-20 justify-between w-full bg-slate-600 flex p-2 md:p-4 sm:h-16 dark:bg-slate-950">
    <div class="flex ">
        <img src={logo} alt="logo" class="w-7 h-7" />
        <a href="/" class="text-white px-2 font-bold py-1">QR Code Generator</a>
    </div>
    <div class="flex">
        <div class="flex mr-6 text-xs items-center">
            <a href="/" class="text-white px-2 font-bold py-1 hover:text-slate-800 dark:hover:text-slate-600">{$_("saved.add")}</a>
            <a href="/" class="text-white px-2 font-bold py-1 hover:text-slate-800 dark:hover:text-slate-600">{$_("scan")}</a>
            <a href="/mylist" class="text-white px-2 font-bold py-1 hover:text-slate-800 dark:hover:text-slate-600">{$_("saved.title")}</a>
        </div>
        <ToggleDarkMode />
        <NavBarLanguage />
    </div>
</nav>