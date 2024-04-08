<script lang="ts">
    import { onMount } from 'svelte';
    import { locale, getLocaleFromNavigator, _ } from 'svelte-i18n';
    import fr_icon from '$assets/trad/france_icon.png';
    import uk_icon from '$assets/trad/kindgom_gb_gbr_icon.png';

    const lang = [
        { id: 'en', name: 'en', img: uk_icon },
        { id: 'fr', name: 'fr', img: fr_icon }
    ];

    let isOpen = false;

    function changeLocale(newLocale: string) {
        locale.set(newLocale); // Correct usage for setting store value
        localStorage.setItem('locale', newLocale);
    }

    onMount(() => {
        const storedLocale = localStorage.getItem('locale') || getLocaleFromNavigator();
        locale.set(storedLocale);
    });

    function clickOutside(node:any) {
        const handleClick = (event: { target: any; }) => {
            if (node && !node.contains(event.target)) {
                isOpen = false;
            }
        };

        document.addEventListener('click', handleClick, true);

        return {
            destroy() {
                document.removeEventListener('click', handleClick, true);
            }
        };
    }
</script>

{#if $locale === 'fr'}
    <button class="mr-1" on:click={() => (isOpen = !isOpen)}>
        <img src={fr_icon} alt="France" class="w-5 h-5 rounded-full border border-t-indigo bg-t-indigo dark:border-t-ciel" />
    </button>
{:else}
    <button class="mr-1" on:click={() => (isOpen = !isOpen)}>
        <img src={uk_icon} alt="United Kingdom" class="w-5 h-5 rounded-full bg-t-indigo dark:bg-t-ciel" />
    </button>
{/if}

{#if isOpen}
    <div use:clickOutside
        class="flex flex-col z-50 fixed top-14 bg-white border-2 border-t-indigo text-t-dark-gray right-4 justify-between w-36 rounded-md
                dark:bg-t-black dark:border-t-ciel dark:text-t-ciel">
        {#each lang as { id, name, img }}
            <button
                class="flex w-full m-2"
                on:click={() => {
                    changeLocale(id);
                    isOpen = false;
                }}>
                <img src={img} alt={name} class="w-6 h-6" />
                <span class="ml-2">{$_(`ui.lang.${name}`)}</span>
            </button>
        {/each}
    </div>
{/if}
