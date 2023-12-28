<script lang="ts">
	export let checked: boolean; 

	export let onchange: (value:boolean,event: Event) => void;

	function change(event: Event) {
		if (typeof checked === 'boolean') {
			checked = !checked;
		}
		if (typeof onchange === 'function') {
			onchange(checked,event);
		}
	}
</script>

<label class="switch">
	<input type="checkbox" {checked} on:change={change} />
	<span class="slider round"></span>
</label>

<style>
	.switch {
		position: relative;
		display: inline-block;
		width: 36px;
		height: 17px;
	}

	.switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		/* background-color: #ccc; */
		border: 1px solid #94a3b8;
		-webkit-transition: 0.4s;
		transition: 0.4s;
	}

	.slider:before {
		content: '';
		height: 10px;
		width: 10px;
		left: 4px;
		bottom: 4px;
		background-color: #94a3b8;
		-webkit-transition: 0.4s;
		transition: 0.4s;
	}

	/* input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
} */

	input:checked + .slider:before {
		-webkit-transform: translateX(15px);
		-ms-transform: translateX(15px);
		transform: translateX(15px);
	}

	/* Rounded sliders */
	.slider.round {
		border-radius: 34px;
	}

	.slider.round:before {
		display: flex;
		/* color: #807f7f; */
		margin-top: 1px;
		margin-left: 2px;
		border-radius: 50%;
		height: 12px;
		width: 12px;
	}
</style>
