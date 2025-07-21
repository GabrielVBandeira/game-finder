const BASE_URL = '/api/games';

/**
 * Consulta um jogo aleatório com base em filtros.
 * @param {Object} filters
 * @param {string[]} filters.genres
 * @param {string} filters.platform 'all' | 'pc' | 'browser'
 * @param {string|number} filters.ram
 * @returns {Promise<Object|null>} Jogo ou null
 */
export async function fetchFilteredGame({ genres, platform = 'all', ram }) {
	try {
		if (!Array.isArray(genres) || genres.length === 0) return null;

		const url = new URL(BASE_URL);
		if (platform !== 'all') {
			url.searchParams.append('platform', platform);
		}

		const response = await fetch(url.toString());
		const data = await response.json();

		let filtered = data.filter((game) => genres.includes(game.genre));

		if (ram) {
			const userRam = parseInt(ram, 10);

			filtered = filtered.filter((game) => {
				const content = `${game.title} ${game.short_description}`.toLowerCase();
				if (userRam < 16 && content.includes('16gb')) return false;
				if (userRam < 8 && content.includes('8gb')) return false;
				if (userRam < 4 && content.includes('4gb')) return false;
				return true;
			});
		}

		if (filtered.length === 0) return null;

		const randomGame = filtered[Math.floor(Math.random() * filtered.length)];
		return randomGame;
	} catch (err) {
		console.error('Erro ao buscar jogos:', err);
		return null;
	}
}
