import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import BuscaAvancada from './pages/BuscaAvancada';
import GameDetails from './pages/GameDetails';
import NotFound from './pages/NotFound';
import useTheme from './hooks/useTheme';

export default function App() {
	useTheme();

	const [searchTerm, setSearchTerm] = useState(null);

	const handleSearch = (term) => {
		setSearchTerm(term);
	};

	const handleClearSearch = () => {
		setSearchTerm(null);
	};

	return (
		<div className="min-h-screen flex flex-col overflow-x-hidden bg-rose-50 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors">
			<Router>
				<Navbar
					searchTerm={searchTerm}
					onSearch={handleSearch}
					onClearSearch={handleClearSearch}
				/>

				<main className="pt-20 px-4 flex-1 w-full max-w-7xl mx-auto">
					<Routes>
						<Route
							path="/"
							element={
								<Home
									searchTerm={searchTerm}
									onClearSearch={handleClearSearch}
									onSearch={handleSearch}
								/>
							}
						/>
						<Route
							path="/busca-avancada"
							element={
								<BuscaAvancada
									searchTerm={searchTerm}
									onSearch={handleSearch}
									onClearSearch={handleClearSearch}
								/>
							}
						/>
						<Route path="/jogo/:id" element={<GameDetails />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</main>

				<Footer />
			</Router>
		</div>
	);
}
