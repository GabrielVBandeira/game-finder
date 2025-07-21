/* eslint-disable no-unused-vars */
// api/games.js
export default async function handler(req, res) {
	try {
		const response = await fetch('https://www.freetogame.com/api/games');
		const data = await response.json();
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json({ error: 'Erro ao buscar jogos da FreeToGame.' });
	}
}
