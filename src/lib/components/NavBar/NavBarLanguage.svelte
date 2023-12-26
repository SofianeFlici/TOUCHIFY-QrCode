<script lang="ts">
    import { onMount } from 'svelte';
    import { locale } from 'svelte-i18n';
    import fr_icon from "$assets/trad/france_icon.png";
    import uk_icon from "$assets/trad/kindgom_gb_gbr_icon.png";

    const lang = [
        { id: 'en', name: 'English', img: uk_icon },
        { id: 'fr', name: 'Français', img: fr_icon }
    ];

    let isOpen = false;

    function changeLocale(newLocale:string) {
        $locale = newLocale;
        localStorage.setItem('locale', newLocale);
    }
    
    onMount(() => {
      const storedLocale = localStorage.getItem('locale');
      if (storedLocale) {
        $locale = storedLocale;
      }
    });    
</script>

{#if $locale === 'fr'}
    <button on:click={() => isOpen = true }>
      <img src={fr_icon} alt="France" class="w-7 h-7"/>
    </button>
{:else}
    <button on:click={() => isOpen = !isOpen}>
      <img src={uk_icon} alt="United Kingdom" class="w-7 h-7" />
    </button>
{/if}

{#if isOpen}
  <div class="flex flex-col fixed top-14 right-4 justify-between w-36 rounded-md">
    {#each lang as { id, name, img }}
    <div class="flex row bg-slate-500">
      <button class="flex w-100 " on:click={() => { changeLocale(id); isOpen = false; }}>
        <img src={img} alt={name} class="w-7 h-7" />
        {name}
      </button>
    </div>
    {/each}
  </div>
{/if}
