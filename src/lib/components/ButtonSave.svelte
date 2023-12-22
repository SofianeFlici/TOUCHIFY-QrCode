<script lang="ts">
    import Card from "$lib/components/Card.svelte";
    import { _ } from 'svelte-i18n';
    import type { Options } from "qr-code-styling";
    import  db  from "$lib/db";

    export let data: Options;


    async function saveOptions() {
    try {
      await db.options.add(data);
      console.log('Options saved successfully');
    } catch (error) {
      console.error('Failed to save options:', error);
    }
  }
</script>

<Card classNames={""}>
    <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
        <button 
            class="bg-transparent border border-gray-500 hover:border-gray-700 rounded text-gray-500 hover:text-gray-700 font-semibold py-2"
           on:click={saveOptions}>
            {$_('menu.save')}
        </button>
        
        <button class="bg-transparent rounded border border-gray-500 hover:border-gray-700 text-gray-500 hover:text-gray-700 font-semibold py-2">
            {$_('menu.list')}
        </button>
    </div>
</Card>
