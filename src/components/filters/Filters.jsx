import React, { useState } from 'react';

const genres = ['Action', 'Adventure', 'Shooter', 'Strategy', 'Racing', 'RPG'];
const platforms = ['all', 'pc', 'browser'];

export default function Filters({ onSubmit }) {
	const [selectedGenres, setSelectedGenres] = useState([]);
	const [platform, setPlatform] = useState('all');
	const [ram, setRam] = useState('');

	const toggleGenre = (genre) => {
		setSelectedGenres((prev) =>
			prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre],
		);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (selectedGenres.length === 0) {
			alert('Selecione ao menos um gênero.');
			return;
		}
		onSubmit({ genres: selectedGenres, platform, ram });
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="space-y-6 max-w-xl mx-auto bg-rose-100 dark:bg-gray-800 p-6 rounded shadow"
		>
			<fieldset>
				<legend className="font-semibold mb-2">Gêneros</legend>
				<div className="flex flex-wrap gap-3">
					{genres.map((genre) => (
						<label key={genre} className="flex items-center gap-1 text-sm">
							<input
								type="checkbox"
								value={genre}
								checked={selectedGenres.includes(genre)}
								onChange={() => toggleGenre(genre)}
							/>
							{genre}
						</label>
					))}
				</div>
			</fieldset>

			<div>
				<label className="block font-semibold mb-1" htmlFor="platform">
					Plataforma
				</label>
				<select
					id="platform"
					value={platform}
					onChange={(e) => setPlatform(e.target.value)}
					className="w-full p-2 rounded dark:bg-gray-700 dark:text-white"
				>
					{platforms.map((p) => (
						<option key={p} value={p}>
							{p === 'all' ? 'Todas' : p.charAt(0).toUpperCase() + p.slice(1)}
						</option>
					))}
				</select>
			</div>

			<div>
				<label className="block font-semibold mb-1" htmlFor="ram">
					Memória RAM (opcional)
				</label>
				<input
					id="ram"
					type="number"
					placeholder="Ex: 8"
					value={ram}
					onChange={(e) => setRam(e.target.value)}
					className="w-full p-2 rounded dark:bg-gray-700 dark:text-white"
				/>
			</div>

			<button
				type="submit"
				className="bg-rose-500 hover:bg-rose-400 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded  transition"
			>
				Encontrar jogo
			</button>
		</form>
	);
}
