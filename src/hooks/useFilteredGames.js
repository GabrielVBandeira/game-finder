import { useEffect, useState } from 'react';

export default function useFilteredGames(filters, onError) {
	const [filteredGames, setFilteredGames] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchGames = async () => {
			try {
				setLoading(true);
				const res = await fetch('/api/games');
				const data = await res.json();

				const filtered = data.filter((g) => {
					const title = g.title?.trim().toLowerCase();

					const platform = g.platform?.trim().toLowerCase();
					const publisher = g.publisher?.trim().toLowerCase();
					const developer = g.developer?.trim().toLowerCase();

					if (
						filters?.title &&
						!title.startsWith(filters.title.trim().toLowerCase())
					)
						return false;

					if (filters?.genres?.length > 0 && !filters.genres.includes(g.genre))
						return false;

					if (
						filters?.platform &&
						filters.platform !== 'all' &&
						!platform.includes(filters.platform.trim().toLowerCase())
					)
						return false;

					if (
						filters?.publishers?.length > 0 &&
						!filters.publishers.some((pub) =>
							publisher?.includes(pub.trim().toLowerCase()),
						)
					)
						return false;

					if (
						filters?.developers?.length > 0 &&
						!filters.developers.some((dev) =>
							developer?.includes(dev.trim().toLowerCase()),
						)
					)
						return false;

					return true;
				});

				setFilteredGames(filtered);
			} catch (err) {
				console.error('Erro ao buscar jogos:', err);
				onError?.('Erro ao buscar jogos.');
				setFilteredGames([]);
			} finally {
				setLoading(false);
			}
		};

		if (filters) fetchGames();
	}, [filters, onError]);

	return { filteredGames, loading };
}
