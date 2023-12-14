<script lang='ts'>
    import { ListQrCodeDataType } from "$lib/QrCode/qrcode.data";
    export let defaultContent: string;
    const data_types = ListQrCodeDataType();
</script>
<div>
    {#if defaultContent == "URL"}
        <input type={data_types[0].inputType} placeholder={data_types[0].placeHolder} class="text-black text-sm rounded mt-3 border bg-gray-100 w-full p-2 placeholder-black" />
    {:else if defaultContent == "Email"}
        <label for="email" class="text-black text-sm font-semibold">Adresse email</label>
        <input type={data_types[1].inputType} class="text-black text-sm rounded mt-3 mb-3 border bg-gray-200 w-full p-2 placeholder-black" />
        <label for="subject" class="text-black text-sm font-semibold">Sujet</label>
        <input type="subject" class="text-black text-sm rounded mt-3 border bg-gray-100 w-full p-2 placeholder-black" />
    {/if}
</div>