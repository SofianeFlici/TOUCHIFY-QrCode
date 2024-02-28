<script lang="ts">
	import  { _ } from 'svelte-i18n';
	import logo from '$assets/Elements_graphiques/Logo - light.svg';
	import dots from '$assets/Elements_graphiques/dots.svg';
</script>

<div class="flex flex-col justify-center h-full items-center content-center w-full ">
	<img src={logo} alt="logo" class="w-20 h-20 mt-12" />
	<div class="flex  w-full justify-between items-center flex-col mt-4 h-24 mb-8">
		<h1 class="text-xl font-bold text-center dark:text-white">QR Code Generator</h1>
		<img src={dots} alt="dots" class="w-5" />
		<p class="font-semibold w-56 text-sm text-center dark:text-white">Créez, personnalisez et enregistrez votre QR Code!</p>
	</div>
	<div class="flex flex-col h-64 w-full justify-between items-center sm:flex-row sm:justify-around
	lg:w-4/6">
		<a
			href="/createQr"
			class="border-2 border-indigo-600 w-32 py-4 rounded-xl flex justify-between p-6 text-indigo-600 font-semibold dark:border-t-ciel dark:text-t-ciel sm:flex-col sm:justify-center sm:items-center"
			>
			<svg class="" id="L" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="24" height="24">
				<line x1="16" y1="1.88" x2="16" y2="30.12" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
				<line x1="30.12" y1="16" x2="1.88" y2="16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
			  </svg>
			  

			{$_('homePage.create')}</a
		>
		<a
			href="/mylist"
			class="border-2 border-indigo-600 w-32 py-4 rounded-xl flex justify-between p-4 text-indigo-600 font-semibold dark:border-t-ciel dark:text-t-ciel
			sm:flex-col sm:justify-center sm:items-center"
			>
			<svg class="mb-2" id="C" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="24" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
				<g fill="none">
				  <rect x="3.16" y="3.28" width="5.23" height="5.23" rx="1.63"/>
				  <rect x="3.16" y="13.38" width="5.23" height="5.23" rx="1.63"/>
				  <rect x="3.16" y="23.49" width="5.23" height="5.23" rx="1.63"/>
				  <line x1="28.84" y1="5.9" x2="12.01" y2="5.9"/>
				  <line x1="28.84" y1="16" x2="12.01" y2="16"/>
				  <line x1="28.84" y1="26.1" x2="12.01" y2="26.1"/>
				</g>
			  </svg>
			  
			  {$_('homePage.myqr')}</a
		>
		<a
			href="/scanqr"
			class="border-2 border-indigo-600 w-32 py-4 rounded-xl flex justify-between p-4 text-indigo-600 font-semibold dark:border-t-ciel dark:text-t-ciel
			sm:flex-col sm:justify-center sm:items-center"
			>
			<svg class="mb-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="24" height="24">
				<polyline points="10.61 28.32 4.08 28.32 4.08 21.79" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
				<polyline points="27.92 21.79 27.92 28.32 21.39 28.32" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
				<polyline points="21.39 3.68 27.92 3.68 27.92 10.21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
				<polyline points="4.08 10.21 4.08 3.68 10.61 3.68" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
				<line x1="30.04" y1="16" x2="1.96" y2="16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
			  </svg>
			  
			  {$_('homePage.scan')}</a
		>
	</div>
</div>
