<script lang="ts">
    import { createEventDispatcher } from 'svelte';
  
    export let value: string;
    const dispatch = createEventDispatcher();
  
    function handleChange(event:any) {
      dispatch('change', event.detail);
      value = event.target.value;
    }
  </script>
  
  <select bind:value={value} on:change={handleChange} class="w-full h-[34px] rounded-md text-t-indigo flex mt-2 border border-t-indigo text-xs font-semibold hover:border-t-indigo mb-3 dark:bg-t-black dark:text-white dark:border-white">
    <slot></slot>
  </select>
  