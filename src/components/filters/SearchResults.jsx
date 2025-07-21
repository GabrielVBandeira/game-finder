import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import GameCard from '../cards/GameCard';
import Loader from '../common/Loader';
import EmptyState from '../common/EmptyState';
import { useToast } from '../common/ToastProvider';
import useFilteredGames from '../../hooks/useFilteredGames';
import useIsMobile from '../../hooks/useIsMobile';

const ITEMS_PER_PAGE = 8;
const ITEMS_PER_PAGE_MOBILE = 4;

export default function SearchResults({
	filters,
	onClear,
	currentPage,
	setCurrentPage,
}) {
	const { error } = useToast();
	const { filteredGames: results, loading } = useFilteredGames(filters, error);
	const isMobile = useIsMobile();

	const itemsPerPage = isMobile ? ITEMS_PER_PAGE_MOBILE : ITEMS_PER_PAGE;
	const totalPages = Math.ceil(results.length / itemsPerPage);
	const start = (currentPage - 1) * itemsPerPage;
	const paginated = results.slice(start, start + itemsPerPage);

	if (loading) {
		return (
			<section className="w-full mx-auto px-4 py-6">
				<Loader />
			</section>
		);
	}

	if (results.length === 0) {
		return (
			<EmptyState
				title="Nenhum jogo encontrado"
				description="Tente alterar os filtros ou buscar outro título."
				onReset={onClear}
			/>
		);
	}

	return (
		<section className="w-full mx-auto px-4 py-6">
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
					className="flex items-center gap-2 px-3 py-1 rounded-md text-sm font-medium text-white bg-rose-500 hover:bg-rose-400 disabled:opacity-40 dark:bg-sky-700 dark:hover:bg-sky-500 transition-colors"
				>
					<FaArrowLeft /> Anterior
				</button>

				<span className="text-sm text-gray-700 dark:text-gray-300">
					Página {currentPage} de {totalPages}
				</span>

				<button
					disabled={currentPage === totalPages}
					onClick={() =>
						currentPage < totalPages && setCurrentPage((p) => p + 1)
					}
					className="flex items-center gap-2 px-3 py-1 rounded-md text-sm font-medium text-white bg-rose-500 hover:bg-rose-400 disabled:opacity-40 dark:bg-sky-700 dark:hover:bg-sky-500 transition-colors"
				>
					Próxima <FaArrowRight />
				</button>
			</div>
		</section>
	);
}
