export let darkMode = false;

export function isDarkMode() {
	return (darkMode = localStorage.getItem('theme') === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches);
}

export function initDarkMode() {
	if (isDarkMode()) document.documentElement.classList.add('dark');
}

export function setDarkMode(value: boolean) {
	darkMode = value;
	localStorage.setItem('theme', value ? 'dark' : '');
	document.documentElement.classList.toggle('dark', value);
	console.log("Dark mode set to", value);
}

export function toggleDarkMode(value: boolean) {
	setDarkMode(value);
}
