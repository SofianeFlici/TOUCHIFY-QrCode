<script lang="ts">
	import logo from '$assets/Elements_graphiques/Logo - light.svg';
	import createQr from '$assets/Elements_graphiques/Créer - 1- black.svg';
	import myQr from '$assets/Elements_graphiques/Liste- black.svg';
	import scanQr from '$assets/Elements_graphiques/Scan- black.svg';
	import dots from '$assets/Elements_graphiques/dots.svg';
</script>

<div class="flex flex-col justify-center h-full items-center content-center">
	<img src={logo} alt="logo" class="w-20 h-20 mt-12" />
	<div class="flex  w-full justify-between items-center flex-col mt-4 h-24 mb-8">
		<h1 class="text-xl font-bold text-center dark:text-white">QR Code Generator</h1>
		<img src={dots} alt="dots" class="w-5" />
		<p class="font-semibold w-56 text-sm text-center dark:text-white">Créez, personnalisez et enregistrez votre QR Code!</p>
	</div>
	<div class="flex flex-col h-64 w-full justify-between items-center">
		<a
			href="/createQr"
			class="border-2 border-indigo-600 w-32 py-4 rounded-xl flex justify-between p-6 text-indigo-600 font-semibold"
			><img src={createQr} alt="create" class="w-6" /> Créer</a
		>
		<a
			href="/mylist"
			class="border-2 border-indigo-600 w-32 py-4 rounded-xl flex justify-between p-4 text-indigo-600 font-semibold"
			><img src={myQr} alt="create" class="w-6" /> Mes QR</a
		>
		<a
			href="/scanqr"
			class="border-2 border-indigo-600 w-32 py-4 rounded-xl flex justify-between p-4 text-indigo-600 font-semibold"
			><img src={scanQr} alt="create" class="w-6" />Scanner</a
		>
	</div>
</div>
