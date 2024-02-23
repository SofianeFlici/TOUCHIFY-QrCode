import { writable } from 'svelte/store';

export const darkMode = writable(false);

export function isDarkMode() {
	const mode = localStorage.getItem('theme');
	let isDarkMode = false;
	if(typeof mode === 'undefined') {
		isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
	} else {
		isDarkMode = mode === 'dark';
	}
	darkMode.set(isDarkMode);
	return (isDarkMode);
}

export function initDarkMode() {
	if (isDarkMode()) document.documentElement.classList.add('dark');
}

export function setDarkMode(value: boolean) {
	darkMode.set(value);
	localStorage.setItem('theme', value ? 'dark' : '');
	document.documentElement.classList.toggle('dark', value);
}

export function toggleDarkMode(value: boolean) {
	setDarkMode(value);
}
