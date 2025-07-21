import { useEffect, useState } from 'react';

export default function useDynamicFilters() {
	const [genres, setGenres] = useState([]);
	const [publishers, setPublishers] = useState([]);
	const [developers, setDevelopers] = useState([]);

	useEffect(() => {
		const fetchGames = async () => {
			try {
				const response = await fetch('/api/games');
				const games = await response.json();

				const genreSet = new Set();
				const publisherSet = new Set();
				const developerSet = new Set();

				games.forEach((game) => {
					if (game.genre) genreSet.add(game.genre.trim());
					if (game.publisher) publisherSet.add(game.publisher.trim());
					if (game.developer) developerSet.add(game.developer.trim());
				});

				setGenres([...genreSet].sort());
				setPublishers([...publisherSet].sort());
				setDevelopers([...developerSet].sort());
			} catch (error) {
				console.error('Erro ao buscar jogos:', error);
			}
		};

		fetchGames();
	}, []);

	return { genres, publishers, developers };
}
