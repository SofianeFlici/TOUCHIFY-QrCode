<script lang="ts">
    import Card from "$lib/components/Card.svelte";
</script>
<Card classNames={""}>
    <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
        <button class="bg-transparent border border-gray-500 hover:border-gray-700 rounded text-gray-500 hover:text-gray-700 font-semibold py-2">
            Sauvegarder
        </button>
        
        <button class="bg-transparent rounded border border-gray-500 hover:border-gray-700 text-gray-500 hover:text-gray-700 font-semibold py-2">
            Mes QR Codes
        </button>
    </div>
</Card>