<script lang="ts">
    import Card from "$lib/components/Card.svelte";
    import { _ } from 'svelte-i18n';
    import type { Options } from "qr-code-styling";
    import { db } from "$lib/db"; // Importez votre instance Dexie

    export let data: Options;

    // Fonction pour sauvegarder les données
    async function saveData() {
        try {
            // Adaptez cette partie selon la structure de votre table IndexedDB
            const item = {
                id: 'unique-id', // Utilisez un identifiant unique approprié
                width: data.width,
                height: data.height,
                color: data.dotsOptions?.color, // Exemple d'accès à une propriété imbriquée
                type: data.dotsOptions?.type,
                background: data.backgroundOptions?.color,
            };

            await db.table("qrCode").put(item);
            console.log("Data saved successfully");
        } catch (error) {
            console.error("Failed to save data", error);
        }
    }
</script>

<Card classNames={""}>
    <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
        <button 
            class="bg-transparent border border-gray-500 hover:border-gray-700 rounded text-gray-500 hover:text-gray-700 font-semibold py-2"
            on:click={saveData}>
            {$_('menu.save')}
        </button>
        
        <button class="bg-transparent rounded border border-gray-500 hover:border-gray-700 text-gray-500 hover:text-gray-700 font-semibold py-2">
            {$_('menu.list')}
        </button>
    </div>
</Card>
