<script lang="ts">
    import Card from "$lib/components/Card.svelte";
	import InputColor from "$lib/components/InputColor.svelte";
    import InputRadioButton from "$lib/components/InputRadioButton.svelte";
	import type { Options } from 'qr-code-styling';
    import { _ } from 'svelte-i18n';

    export let dotsOptions: Options["dotsOptions"];
    
    let style = ["square", "rounded", "dots"] as const;
    let transparent = true;
    let degrade = false;

</script>

<Card>
    {#if dotsOptions}
    <div class="flex flex-col">
        <h2 class="font-semibold m-1 mb-2">{$_('options.title')}
        <p class="font-semibold m-1">{$_('dots.type.label')}</p>
        <div>
            {#each style as style}
                <InputRadioButton on:click={() => {if (dotsOptions) dotsOptions.type = style}}>{$_(`dots.type.${style}`)}</InputRadioButton>
            {/each}  
        </div>
        <div>
            <p class="font-semibold m-1">{$_('dots.color.label')}</p>
            <InputColor bind:value = {dotsOptions.color} />
        </div>
        <div>
            <input type="checkbox" value="transparent"on:click={() => transparent = !transparent} checked={transparent} class="m-1" />{$_('ui.color.transparent')}
        </div>
        {#if !transparent}
            <div>
                <InputColor bind:value = {dotsOptions.color}/>
            </div>
            <input type="checkbox" value="degrade"on:click={() => degrade = !degrade} checked={degrade} class="m-1" />{$_('ui.gradient.use')}
            {/if}
    </div> 
    {/if}
</Card>
