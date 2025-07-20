const BASE_URL = import.meta.env.DEV
	? '/api/games'
	: 'https://www.freetogame.com/api/games';

/**
 * Consulta jogos baseados em filtros.
 * @param {Object} filters
 * @param {string[]} filters.genres
 * @param {string} filters.platform 'all' | 'pc' | 'browser'
 * @param {string|number} filters.ram
 * @returns {Promise<Object|null>} Jogo aleatório ou null se não encontrado
 */
export async function fetchFilteredGame({ genres, platform, ram }) {
	try {
		const url = new URL(BASE_URL, window.location.origin);
		if (platform !== 'all') {
			url.searchParams.append('platform', platform);
		}

		const response = await fetch(url.toString());
		const data = await response.json();

		// Filtrar por gênero e RAM
		let filtered = data.filter((game) => genres.includes(game.genre));

		// Exemplo: se RAM for 8GB, ignorar jogos que exigem mais (a API não tem info direta, usamos workaround)
		if (ram) {
			const userRam = parseInt(ram, 10);

			filtered = filtered.filter((game) => {
				const info = `${game.title} ${game.short_description}`.toLowerCase();
				return !info.includes('16gb') || userRam >= 16;
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
