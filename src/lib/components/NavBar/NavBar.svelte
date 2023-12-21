<script lang="ts">
    import logo from "$assets/logo/9043004_scan_qr_code_icon.svg";
    import ToggleDarkMode from "./toggleDarkMode.svelte";
    import NavBarLanguage from "./NavBarLanguage.svelte";
</script>

<nav class="sticky text-sm top-0 z-20 justify-between w-full bg-slate-600 flex p-2 md:p-4 sm:h-16">
    <div class="flex">
        <img src={logo} alt="logo" class="w-7 h-7" />
        <h2 class="text-white px-2 font-bold py-1">QR Code Generator</h2>
    </div>
    <div class="flex">
        <ToggleDarkMode />
        <NavBarLanguage />
    </div>
</nav>