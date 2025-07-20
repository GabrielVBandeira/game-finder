import React, { useEffect, useState } from 'react';
import GameCard from '../game/GameCard';
import Loader from '../common/Loader';
import EmptyState from '../common/EmptyState';
import { useToast } from '../common/ToastProvider';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';

const ITEMS_PER_PAGE = 8;

export default function SearchResults({ term, onClear }) {
	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const { error } = useToast();

	// Busca inicial com filtro
	useEffect(() => {
		const fetchGames = async () => {
			try {
				setLoading(true);
				const startTime = Date.now();
				const res = await fetch('api/api/games');
				const data = await res.json();

				const filtered = data.filter((game) =>
					game.title.toLowerCase().includes(term.toLowerCase()),
				);

				const elapsed = Date.now() - startTime;
				const minDelay = 400;

				setTimeout(() => {
					setResults(filtered);
					setCurrentPage(1);
					setLoading(false);
				}, Math.max(0, minDelay - elapsed));
			} catch (err) {
				console.error('Erro ao buscar jogos:', err);
				error(
					'Não foi possível carregar os jogos. Tente novamente mais tarde.',
				);
				setResults([]);
				setLoading(false);
			}
		};

		fetchGames();
	}, [term]);

	const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE);
	const start = (currentPage - 1) * ITEMS_PER_PAGE;
	const paginated = results.slice(start, start + ITEMS_PER_PAGE);

	useEffect(() => {
		if (results.length === 0) return;

		const pageImages = paginated.map((game) => game.thumbnail);
		let loadedCount = 0;

		const handleImgLoad = () => {
			loadedCount++;
			if (loadedCount === pageImages.length) {
				setLoading(false);
			}
		};

		setLoading(true);

		const delay = setTimeout(() => {
			pageImages.forEach((src) => {
				const img = new Image();
				img.onload = handleImgLoad;
				img.onerror = handleImgLoad;
				img.src = src;
			});
		}, 200);

		return () => clearTimeout(delay);
	}, [currentPage, results]);

	if (loading) return <Loader />;

	if (results.length === 0)
		return (
			<EmptyState
				title="Nenhum jogo encontrado"
				description="Tente alterar os filtros ou buscar outro título."
				onReset={onClear}
			/>
		);

	return (
		<div>
			<AnimatePresence mode="wait">
				<motion.div
					key={currentPage}
					className="grid gap-4 mt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3 }}
				>
					{paginated.map((game) => (
						<GameCard key={game.id} game={game} />
					))}
				</motion.div>
			</AnimatePresence>

			<div className="flex justify-center items-center gap-4 mt-6">
				<button
					disabled={currentPage === 1}
					onClick={() => setCurrentPage((p) => p - 1)}
					className="flex items-center gap-2 px-3 py-1 rounded-md text-sm font-medium 
      text-white bg-rose-500 hover:bg-rose-400 disabled:opacity-40 
      dark:bg-sky-700 dark:hover:bg-sky-500 transition-colors"
				>
					<FaArrowLeft /> Anterior
				</button>

				<span className="text-sm text-gray-700 dark:text-gray-300">
					Página {currentPage} de {totalPages}
				</span>

				<button
					disabled={currentPage === totalPages}
					onClick={() => setCurrentPage((p) => p + 1)}
					className="flex items-center gap-2 px-3 py-1 rounded-md text-sm font-medium 
      text-white bg-rose-500 hover:bg-rose-400 disabled:opacity-40 
      dark:bg-sky-700 dark:hover:bg-sky-500 transition-colors"
				>
					Próxima <FaArrowRight />
				</button>
			</div>
		</div>
	);
}
