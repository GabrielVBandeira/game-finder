import React, { useState, useEffect } from 'react';
import { FaGamepad, FaSearch } from 'react-icons/fa';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import useGameSuggestions from '../../hooks/useGameSuggestions';

export default function Navbar({ onClearSearch, searchTerm }) {
	const [searchInput, setSearchInput] = useState(searchTerm || '');
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
	const navigate = useNavigate();
	const suggestions = useGameSuggestions(searchInput);

	useEffect(() => {
		if (!searchTerm) setSearchInput('');
	}, [searchTerm]);

	const handleSubmit = () => {
		const trimmed = (searchInput || '').trim();
		if (trimmed) {
			navigate('/busca-avancada', {
				state: { titleFromSearch: trimmed },
			});
			setSearchInput('');
			setShowSuggestions(false);
		}
	};

	const handleClear = () => {
		setSearchInput('');
		onClearSearch?.();
		setShowSuggestions(false);
	};

	const handleBuscaAvancada = () => {
		onClearSearch?.();
		navigate('/busca-avancada');
	};

	return (
		<header className="fixed top-0 left-0 w-full z-50 bg-rose-100 dark:bg-gray-800 shadow px-4 py-3">
			<div className=" mx-auto flex flex-wrap items-center justify-between sm:gap-4">
				{/* Logo */}
				<motion.div
					onClick={() => {
						handleClear();
						navigate('/');
					}}
					whileHover={{ scale: 1.05, opacity: 0.9 }}
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.4 }}
					className="cursor-pointer flex items-center text-xl font-bold text-gray-900 dark:text-white whitespace-nowrap"
				>
					<FaGamepad className="text-4xl text-pink-600 dark:text-sky-400 rotate-90 mr-2" />
					<div className="leading-none hidden sm:block">
						<span className="block">Game</span>
						<span className="block">Finder</span>
					</div>
				</motion.div>

				{/* Centro */}
				<div className="flex flex-row items-center justify-center flex-1 sm:gap-4">
					<button
						onClick={handleBuscaAvancada}
						className="whitespace-nowrap px-3 py-1 rounded-md text-sm font-medium bg-rose-500 text-white hover:bg-rose-400 dark:bg-sky-700 dark:hover:bg-sky-500 transition-colors"
					>
						Busca Avançada
					</button>

					<div className="text-center relative w-full max-w-xl">
						<input
							aria-autocomplete="list"
							aria-controls="suggestions-list"
							type="text"
							placeholder="Buscar jogo por título..."
							value={searchInput || ''}
							onChange={(e) => {
								setSearchInput(e.target.value);
								setShowSuggestions(true);
							}}
							onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
							className="hidden sm:block w-full pl-4 pr-10 py-2 rounded-md dark:bg-gray-700 dark:text-white text-black focus:outline-none"
							aria-label="Campo de busca por título de jogo"
						/>

						<button
							onClick={handleSubmit}
							className="hidden sm:block absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300"
							aria-label="Buscar"
						>
							<FaSearch />
						</button>

						<button
							onClick={() => setIsMobileSearchOpen((prev) => !prev)}
							className="sm:hidden ml-2 text-xl text-gray-600 dark:text-gray-300"
							aria-label="Abrir busca"
						>
							<FaSearch />
						</button>

						{/* Dropdown de busca para mobile */}
						{isMobileSearchOpen && (
							<div className="absolute min-w-40 top-full left-0 mt-2 w-full z-40 sm:hidden bg-white dark:bg-gray-700 shadow-lg rounded-md p-3">
								<input
									type="text"
									value={searchInput}
									onChange={(e) => {
										setSearchInput(e.target.value);
										setShowSuggestions(true);
									}}
									onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
									placeholder="Buscar jogo..."
									className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
									aria-label="Buscar jogo"
									autoFocus
								/>

								{/* Sugestões no mobile */}
								{searchInput && showSuggestions && suggestions.length > 0 && (
									<ul className="mt-2 max-h-60 overflow-y-auto">
										{suggestions.map((game) => (
											<li
												key={game.id}
												className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
												onClick={() => {
													navigate(`/jogo/${game.id}`);
													setSearchInput('');
													setShowSuggestions(false);
													setIsMobileSearchOpen(false);
												}}
											>
												<img
													src={game.thumbnail}
													alt={`Thumb de ${game.title}`}
													className="w-10 h-10 rounded object-cover"
												/>
												<span className="text-sm text-gray-800 dark:text-white">
													{game.title}
												</span>
											</li>
										))}
									</ul>
								)}
							</div>
						)}

						{/* Sugestões */}
						{searchInput && showSuggestions && suggestions.length > 0 && (
							<ul className="absolute z-10 top-full mt-2 w-full max-w-full bg-white dark:bg-gray-700 shadow-lg rounded-md max-h-64 overflow-y-auto overflow-x-hidden">
								{suggestions.map((game) => (
									<li
										key={game.id}
										className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
										onClick={() => {
											navigate(`/jogo/${game.id}`);
											setSearchInput('');
											setShowSuggestions(false);
										}}
									>
										<img
											src={game.thumbnail}
											alt={`Thumb de ${game.title}`}
											className="w-10 h-10 rounded object-cover"
										/>
										<span className="text-sm text-gray-800 dark:text-white">
											{game.title}
										</span>
									</li>
								))}
							</ul>
						)}
					</div>

					{searchInput && (
						<button
							onClick={handleClear}
							className="hidden sm:block text-sm text-red-500 hover:underline whitespace-nowrap"
						>
							Limpar Filtro
						</button>
					)}
				</div>

				<div className="shrink-0 scale-50 sm:scale-75">
					<ThemeToggle />
				</div>
			</div>
		</header>
	);
}
