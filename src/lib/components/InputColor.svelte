<script lang="ts">
	export let value: string;

    function handleColorChange(event:any) {
        value = event.target.value;
    }

	$: console.log(value);
</script>

<div class="relative flex items-center  w-full h-24 p-2 box-border {(value === '#ffffff' ? 'border rounded-md border-t-gray dark:border-none' : 'border-none' )}">
	<input type="color" bind:value class="w-full h-full absolute cursor-pointer bg-transparent opacity-0 " on:input={handleColorChange} />
	<div class="value-overlay rounded-md" style="background-color: {value}">{value}</div>
</div>

<style lang="postcss">
	.value-overlay {
		@apply pointer-events-none  flex h-full w-full  items-center justify-center text-center;
		top: 0;
		left: 0;
		color: white;
		text-shadow: 0 0 1px rgba(0, 0, 0, 0.9);
		font-weight: bold;
}
</style>
