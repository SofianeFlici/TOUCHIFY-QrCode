<script>
	import Switch from '../Switch.svelte';
    let multiValue = 'light';

</script>
<div class="flex items-center">
    <Switch bind:value={multiValue} design="multi" options={['ddee ', 'dd ']} fontSize={12}/>
</div>
