<script lang="ts">
    import InputColor from "$lib/components/inputColor.svelte";
	export let dotsOptions: Options['dotsOptions'];

    let linear = true;
    let radial = false;
    let rotation = 0;
    let color1 = "#000000";
    let color2 = "#ffffff";

</script>

<div class="flex">
        <label for="gradientType" class="font-semibold m-1">{$_('gradient.type.label')}</label>
            <InputColor bind:value={color1} />
            <InputColor bind:value={color2} />        
        <label class="font-semibold m-1">{$_('gradient.rotation.label')}</label>
       
        <input type="range" min="0" max="360" bind:value={rotation} class="w-20"/>
</div>