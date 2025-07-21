import { useEffect, useState } from 'react';

const normalize = (str) =>
	str
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.trim();

export default function useGameSuggestions(query) {
	const [suggestions, setSuggestions] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			if (!query || query.length < 2) {
				setSuggestions([]);
				return;
			}

			try {
				const res = await fetch('/api/games');
				const data = await res.json();

				const normalizedQuery = normalize(query);

				const filtered = data
					.filter((game) => normalize(game.title).startsWith(normalizedQuery))
					.slice(0, 6);

				setSuggestions(filtered);
			} catch (error) {
				console.error('Erro ao buscar sugestões:', error);
				setSuggestions([]);
			}
		};

		const delay = setTimeout(fetchData, 300);
		return () => clearTimeout(delay);
	}, [query]);

	return suggestions;
}
