import { writable } from 'svelte/store';
import { init, register } from 'svelte-i18n';
import { browser } from '$app/environment';

// Création d'un store réactif pour la locale
export const localeStore = writable('en');

register('en', () => import('./../locales/en.json'));
register('fr', () => import('./../locales/fr.json'));

init({
    fallbackLocale: 'en', // Utiliser une valeur fixe
    initialLocale: browser ? window.navigator.language : 'en',
});
