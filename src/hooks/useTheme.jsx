import { useEffect } from 'react';

export default function useTheme() {
	useEffect(() => {
		const userPref = localStorage.getItem('theme');
		const systemPref = window.matchMedia(
			'(prefers-color-scheme: dark)',
		).matches;
		const root = document.documentElement;

		if (userPref === 'dark' || (!userPref && systemPref)) {
			root.classList.add('dark');
		} else {
			root.classList.remove('dark');
		}
	}, []);
}
