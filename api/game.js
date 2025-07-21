/* eslint-disable no-unused-vars */
// api/game.js
export default async function handler(req, res) {
	const { id } = req.query;

	if (!id) {
		return res.status(400).json({ error: 'ID do jogo é obrigatório.' });
	}

	try {
		const response = await fetch(
			`https://www.freetogame.com/api/game?id=${id}`,
		);
		const data = await response.json();
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json({ error: 'Erro ao buscar detalhes do jogo.' });
	}
}
