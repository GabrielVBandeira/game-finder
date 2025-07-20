import React, { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import { FaSearch } from 'react-icons/fa';

export default function Navbar({ onSearch, searchTerm, onClearSearch }) {
	const [searchInput, setSearchInput] = useState(searchTerm || '');

	useEffect(() => {
		const debounce = setTimeout(() => {
			if (searchInput.trim()) {
				onSearch(searchInput.trim());
			}
		}, 500);
		return () => clearTimeout(debounce);
	}, [searchInput]);

	const handleClear = () => {
		setSearchInput('');
		onClearSearch();
	};

	return (
		<header className="bg-rose-100 dark:bg-gray-800 shadow px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
			<div className="text-xl font-bold text-gray-900 dark:text-white whitespace-nowrap">
				🎮 Game Finder
			</div>

			<div className="flex-1 max-w-md w-full mx-auto flex items-center gap-2">
				<div className="relative w-full max-w-md mx-auto">
					<input
						type="text"
						placeholder="Buscar jogo por título..."
						value={searchInput}
						onChange={(e) => setSearchInput(e.target.value)}
						className="w-full pl-4 pr-10 py-2 rounded-md dark:bg-gray-700 dark:text-white text-black dark:text-white focus:outline-none"
					/>
					<span className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-300">
						<FaSearch />
					</span>
				</div>
				{searchInput && (
					<button
						onClick={handleClear}
						className="text-sm text-red-500 hover:underline"
					>
						Limpar Filtro
					</button>
				)}
			</div>

			<div className="shrink-0">
				<ThemeToggle />
			</div>
		</header>
	);
}
