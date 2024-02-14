<script lang="ts">
    import { createEventDispatcher } from 'svelte';
  
    export let value: string;
    const dispatch = createEventDispatcher();
  
    // Fonction pour gérer les changements de sélection
    function handleChange(event:any) {
      dispatch('change', event.detail); // Émettre un événement personnalisé avec la nouvelle valeur
      value = event.target.value; // Mettre à jour la valeur interne pour la liaison
    }
  </script>
  
  <select bind:value={value} on:change={handleChange} class="w-full rounded-md text-t-indigo p-2 mt-2 border-2 border-t-indigo text-xs font-semibold hover:border-t-indigo mb-3 dark:bg-t-black dark:text-white dark:border-white">
    <slot></slot> <!-- Utiliser des slots pour passer des options personnalisées -->
  </select>
  