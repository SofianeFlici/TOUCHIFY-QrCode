<script lang="ts">
    import logo from "$assets/logo/9043004_scan_qr_code_icon.svg";
    console.log(logo);
</script>

<nav class="bg-gray-700 flex items-center justify-between px-4 p-2 text-xs md:p-4">
    <div class="flex">
        <img src={logo} alt="logo" class="w-7 h-7 md:w-16 md:h-16" />
        <h2 class="text-white text-sm px-3 font-bold  py-1">QR Code Generator</h2>
    </div>
    <div class="flex">
        <a href="/" class="text-white hover:text-gray-300 px-2 py-2 rounded-md text-xs font-medium">Home</a>
        <a href="/qrCode" class="text-white hover:text-gray-300 px-2 py-2 rounded-md text-xs font-medium">QR Code</a>
    </div>
</nav>