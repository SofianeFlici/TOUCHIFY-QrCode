<script lang="ts">
    export let classNames:string = "default";
</script>

<div class="m-4 {classNames}">
    <slot />
</div>

<style lang="postcss">
    .default {
        @apply 
            shadow-lg
            p-2
            bg-white;
        }
</style>