
export function isDarkMode() {
	return (
		localStorage.getItem('theme') === 'dark' ||
		window.matchMedia('(prefers-color-scheme: dark)').matches
	);
}

export function initDarkMode() {
	if (isDarkMode()) document.documentElement.classList.add('dark');
}

export function setDarkMode(value: boolean) {
	localStorage.setItem('theme', value ? 'dark' : '');
	document.documentElement.classList.toggle('dark', value);
}

export function toggleDarkMode(value:boolean) {
	setDarkMode(value);
}
