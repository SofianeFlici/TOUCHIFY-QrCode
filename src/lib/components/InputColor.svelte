<script lang="ts">
	export let value: string;

    function handleColorChange(event:any) {
        value = event.target.value;
    }
</script>

<div class="relative flex items-center  w-full h-24 p-2 box-border">
	<input type="color" bind:value class="w-full h-full absolute cursor-pointer bg-transparent opacity-0" on:input={handleColorChange} />
	<div class="value-overlay bg-green-400 rounded-md" style="background-color: {value}">{value}</div>
</div>

<style lang="postcss">
	.value-overlay {
		@apply pointer-events-none  flex h-full w-full  items-center justify-center text-center;
		top: 0;
		left: 0;
		color: white;
}
</style>
