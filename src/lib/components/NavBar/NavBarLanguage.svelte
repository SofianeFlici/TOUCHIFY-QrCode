<script lang="ts">
    import { onMount } from 'svelte';
    import { locale } from 'svelte-i18n';
    import fr_icon from "$assets/trad/france_icon.png";
    import uk_icon from "$assets/trad/kindgom_gb_gbr_icon.png";

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

  
  {#if $locale === 'en'}
  <button on:click={() => changeLocale('fr')}>
    <img src={fr_icon} alt="France" class="w-7 h-7"/>
    </button>
  {:else}
  <button on:click={() => changeLocale('en')}>
    <img src={uk_icon} alt="United Kingdom" class="w-7 h-7" />
    </button>
  {/if}
  