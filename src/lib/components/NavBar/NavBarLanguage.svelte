<script lang="ts">
    import { locale } from 'svelte-i18n';
//     import franceIcon from './../../../../static/france_icon.png';
    // import ukIcon from './../../../../static/kindgom_gb_gbr_icon.png';
    import fr_icon from "$assets/trad/france_icon.png";
    import uk_icon from "$assets/trad/kindgom_gb_gbr_icon.png";

  </script>
  
  {#if $locale === 'en'}
    <button on:click={() => $locale = 'fr'}>
      <img src={fr_icon} alt="France" class="w-7 h-7"/>
    </button>
  {:else}
    <button on:click={() => $locale = 'en'}>
      <img src={uk_icon} alt="United Kingdom" class="w-7 h-7" />
    </button>
  {/if}
  