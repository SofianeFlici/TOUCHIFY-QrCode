<script lang="ts">
    import inputColor from "$lib/components/inputColor.svelte";

    let linear = true;
    let radial = false;
    let rotation = 0;
    let color1 = "#000000";
    let color2 = "#ffffff";

</script>

<div class="flex">
    <InputColor bind:value={color1} />
    <InputColor bind:value={color2} />

    <div class="flex flex-col">
        <label class="font-semibold m-1">{$_('gradient.type.label')}</label>
        <div class="flex">
            <InputRadioButton bind:value={linear} value={true} text={$_('gradient.type.linear')} />
            <InputRadioButton bind:value={radial} value={true} text={$_('gradient.type.radial')} />
        </div>
        
        <label class="font-semibold m-1">{$_('gradient.rotation.label')}</label>
       
        <input type="range" min="0" max="360" bind:value={rotation} class="w-20"/>

    </div>
</div>