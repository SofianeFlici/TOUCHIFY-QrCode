<script lang="ts">
    import logo from "$assets/logo/9043004_scan_qr_code_icon.svg";
</script>

<nav class="sticky text-sm top-0 z-20 justify-between w-full bg-slate-600 flex p-2 md:p-4 sm:h-16">
    <div class="flex">
        <img src={logo} alt="logo" class="w-7 h-7" />
        <h2 class="text-white px-3 font-bold py-1">QR Code Generator</h2>
    </div>
    <div class="flex">
        <a href="/" class="text-white hover:text-gray-300 px-2 py-2 rounded-md text-xs font-medium">Home</a>
        <a href="/qrCode" class="text-white hover:text-gray-300 px-2 py-2 rounded-md text-xs font-medium">QR Code</a>
    </div>
</nav>