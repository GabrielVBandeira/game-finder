import React, { useEffect, useState } from 'react';
import ThemeToggle from './components/layout/ThemeToggle';
import Filters from './components/filters/Filters';
import Navbar from './components/layout/Navbar';
import SearchResults from './components/filters/SearchResults';
import Carousel from './components/layout/Carousel';
import Footer from './components/layout/Footer';

export default function App() {
	// Define o tema com base no sistema ou armazenamento local
	useEffect(() => {
		const userPref = localStorage.getItem('theme');
		const systemPref = window.matchMedia(
			'(prefers-color-scheme: dark)',
		).matches;
		const root = document.documentElement;

		if (userPref === 'dark' || (!userPref && systemPref)) {
			root.classList.add('dark');
		} else {
			root.classList.remove('dark');
		}
	}, []);

	const [gamesRecentes, setGamesRecente] = useState([]);

	useEffect(() => {
		const fetchRecentes = async () => {
			try {
				const res = await fetch('api/api/games');
				const data = await res.json();
				const recentes = data
					.filter((game) => game.release_date) // garante que tenha data
					.sort((a, b) => new Date(b.release_date) - new Date(a.release_date)) // ordem decrescente
					.slice(0, 6); // pega os 6 primeiros

				setGamesRecente(recentes);
			} catch (err) {
				console.error('Erro ao carregar recentes:', err);
			}
		};

		fetchRecentes();
	}, []);

	const [searchTerm, setSearchTerm] = useState(null);

	const handleSearch = (term) => {
		setSearchTerm(term);
	};

	const handleClearSearch = () => {
		setSearchTerm(null);
	};

	return (
		<div className="min-h-screen flex flex-col overflow-x-hidden bg-rose-50 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors">
			<Navbar
				onSearch={handleSearch}
				searchTerm={searchTerm}
				onClearSearch={handleClearSearch}
			/>
			<main className="p-4">
				{searchTerm ? (
					<SearchResults term={searchTerm} />
				) : (
					<>
						<Carousel games={gamesRecentes} />
						<Filters onSubmit={handleSearch} />
					</>
				)}
			</main>

			<Footer />
		</div>
	);
}
