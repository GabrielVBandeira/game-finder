import { useEffect, useState } from 'react';

export default function useRecentGames() {
	const [games, setGames] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchRecentes = async () => {
			try {
				const res = await fetch('/api/games');
				const data = await res.json();

				const recentes = data
					.filter((game) => game.release_date)
					.sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
					.slice(0, 10);

				setGames(recentes);
			} catch (err) {
				console.error('Erro ao carregar jogos recentes:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchRecentes();
	}, []);

	return { games, loading };
}
