<script lang="ts">
    import { createEventDispatcher } from 'svelte';
  
    export let value: string;
    const dispatch = createEventDispatcher();
  
    function handleChange(event:any) {
      dispatch('change', event.detail);
      value = event.target.value;
    }
  </script>
  
  <select bind:value={value} on:change={handleChange} class="w-full h-full py-2 rounded-md text-t-indigo flex border border-t-indigo text-sm  hover:border-t-indigo dark:bg-t-black dark:text-white dark:border-white">
    <slot></slot>
  </select>
  