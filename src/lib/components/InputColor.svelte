<script lang="ts">
	export let value: string;

    function handleColorChange(event:any) {
        value = event.target.value;
    }
</script>

<div class="relative flex items-center bg-red-400 w-full h-full">
	<input type="color" bind:value class="w-full h-full cursor-pointer bg-transparent p-2" on:input={handleColorChange} />
	<div class="value-overlay">{value}</div>
</div>

<style lang="postcss">
	.value-overlay {
		@apply pointer-events-none absolute flex h-full w-full  items-center justify-center text-center;
		top: 0;
		left: 0;
		color: white;
}
</style>
