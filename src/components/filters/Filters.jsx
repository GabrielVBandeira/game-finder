/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useToast } from '../common/ToastProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaMinus } from 'react-icons/fa';
import Select from 'react-select';
import useDynamicFilters from '../../hooks/useDynamicFilters';
import useTailwindDarkMode from '../../hooks/useTailwindDarkMode';

export default function Filters({ onSubmit, initialTitle = '' }) {
	const isDarkMode = useTailwindDarkMode();

	const customSelectStyles = {
		control: (provided, state) => ({
			...provided,
			backgroundColor: isDarkMode ? '#374151' : '#ffffff',
			borderColor: state.isFocused
				? isDarkMode
					? '#60a5fa'
					: '#fda4af'
				: isDarkMode
				? '#4b5563'
				: '#d1d5db',
			boxShadow: state.isFocused
				? `0 0 0 1px ${isDarkMode ? '#3b82f6' : '#f87171'}`
				: 'none',
			'&:hover': {
				borderColor: isDarkMode ? '#3b82f6' : '#f87171',
			},
			color: isDarkMode ? '#fff' : '#000',
		}),
		menu: (provided) => ({
			...provided,
			backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
		}),
		option: (provided, state) => ({
			...provided,
			backgroundColor: state.isFocused
				? isDarkMode
					? '#3b82f6'
					: '#f87171'
				: isDarkMode
				? '#1f2937'
				: '#ffffff',
			color: isDarkMode ? '#fff' : '#000',
			':active': {
				backgroundColor: isDarkMode ? '#2563eb' : '#f43f5e',
			},
		}),
		multiValue: (provided) => ({
			...provided,
			backgroundColor: isDarkMode ? '#4b5563' : '#fda4af',
		}),
		multiValueLabel: (provided) => ({
			...provided,
			color: isDarkMode ? '#fff' : '#000',
		}),
		multiValueRemove: (provided) => ({
			...provided,
			color: '#fff',
			backgroundColor: isDarkMode ? '#60a5fa' : '#f87171',
			':hover': {
				backgroundColor: isDarkMode ? '#3b82f6' : '#f43f5e',
				color: '#fff',
			},
		}),
		input: (provided) => ({
			...provided,
			color: isDarkMode ? '#fff' : '#000',
		}),
		singleValue: (provided) => ({
			...provided,
			color: isDarkMode ? '#fff' : '#000',
		}),
	};
	const { warning } = useToast();
	const [title, setTitle] = useState('');
	const [debouncedTitle, setDebouncedTitle] = useState('');
	const [selectedGenres, setSelectedGenres] = useState([]);
	const [selectedPublishers, setSelectedPublishers] = useState([]);
	const [selectedDevelopers, setSelectedDevelopers] = useState([]);
	const [platform, setPlatform] = useState('all');
	const [showGenres, setShowGenres] = useState(false);
	const [showPublishers, setShowPublishers] = useState(false);
	const [showDevelopers, setShowDevelopers] = useState(false);
	const { genres, publishers, developers } = useDynamicFilters();

	useEffect(() => {
		setTitle(initialTitle);
	}, [initialTitle]);

	useEffect(() => {
		const timeout = setTimeout(() => setDebouncedTitle(title), 300);
		return () => clearTimeout(timeout);
	}, [title]);

	useEffect(() => {
		onSubmit({
			title: debouncedTitle,
			genres: selectedGenres,
			platform,
			publishers: selectedPublishers.map((p) => p.value),
			developers: selectedDevelopers.map((d) => d.value),
		});
	}, [
		debouncedTitle,
		selectedGenres,
		selectedPublishers,
		selectedDevelopers,
		platform,
	]);

	const toggleItem = (item, list, setList) => {
		setList((prev) =>
			prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
		);
	};

	const handleClear = () => {
		if (
			!title &&
			selectedGenres.length === 0 &&
			selectedPublishers.length === 0 &&
			selectedDevelopers.length === 0 &&
			platform === 'all'
		) {
			warning('Nenhum filtro para limpar.');
			return;
		}

		setTitle('');
		setSelectedGenres([]);
		setSelectedPublishers([]);
		setSelectedDevelopers([]);
		setPlatform('all');
		onSubmit(null);
	};

	const getPillClass = (active) =>
		`px-3 py-1 rounded-full text-sm font-medium border transition ${
			active
				? 'bg-rose-500 dark:bg-sky-600 text-white'
				: 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-rose-200 dark:hover:bg-sky-700'
		}`;

	const SectionToggle = ({ label, show, toggle }) => (
		<div className="flex items-center justify-between mb-2">
			<p className="font-semibold">{label}</p>
			<button
				type="button"
				onClick={toggle}
				className="text-rose-600 hover:text-rose-400 dark:text-blue-300 dark:hover:text-blue-500 p-1"
			>
				{show ? <FaMinus /> : <FaPlus />}
			</button>
		</div>
	);

	return (
		<form className="space-y-6 max-w-xl mx-auto bg-rose-100 dark:bg-gray-800 p-6 rounded shadow">
			{/* Título */}
			<div>
				<label className="block font-semibold mb-1" htmlFor="title">
					Título do jogo
				</label>
				<input
					id="title"
					type="text"
					placeholder="Ex: Ragnarok"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className="w-full p-2 rounded dark:bg-gray-700 dark:text-white"
				/>
			</div>

			{/* Gêneros */}
			<div>
				<SectionToggle
					label="Gêneros"
					show={showGenres}
					toggle={() => setShowGenres(!showGenres)}
				/>
				<AnimatePresence>
					{showGenres && (
						<motion.div
							initial={{ height: 0, opacity: 0 }}
							animate={{ height: 'auto', opacity: 1 }}
							exit={{ height: 0, opacity: 0 }}
							className="overflow-hidden"
						>
							<div className="flex flex-wrap gap-2">
								{genres.map((genre) => (
									<button
										key={genre}
										type="button"
										onClick={() =>
											toggleItem(genre, selectedGenres, setSelectedGenres)
										}
										className={getPillClass(selectedGenres.includes(genre))}
									>
										{genre}
									</button>
								))}
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			{/* Publicadoras */}
			<div>
				<SectionToggle
					label="Publicadoras"
					show={showPublishers}
					toggle={() => setShowPublishers(!showPublishers)}
				/>
				<AnimatePresence>
					{showPublishers && (
						<div className="mt-2">
							<Select
								isMulti
								options={publishers.map((p) => ({ value: p, label: p }))}
								value={selectedPublishers}
								onChange={setSelectedPublishers}
								styles={customSelectStyles}
								classNamePrefix="react-select"
								placeholder="Selecione..."
								noOptionsMessage={() => 'Nenhuma opção'}
							/>
						</div>
					)}
				</AnimatePresence>
			</div>

			{/* Desenvolvedoras */}
			<div>
				<SectionToggle
					label="Desenvolvedoras"
					show={showDevelopers}
					toggle={() => setShowDevelopers(!showDevelopers)}
				/>
				<AnimatePresence>
					{showDevelopers && (
						<div className="mt-2">
							<Select
								isMulti
								options={developers.map((d) => ({ value: d, label: d }))}
								value={selectedDevelopers}
								onChange={setSelectedDevelopers}
								styles={customSelectStyles}
								classNamePrefix="react-select"
								placeholder="Selecione..."
								noOptionsMessage={() => 'Nenhuma opção'}
							/>
						</div>
					)}
				</AnimatePresence>
			</div>

			{/* Plataforma */}
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
					<option value="all">Todas</option>
					<option value="pc">PC</option>
					<option value="browser">Browser</option>
				</select>
			</div>

			{/* Ações */}
			<div>
				<button
					type="button"
					onClick={handleClear}
					className="bg-rose-300 dark:bg-blue-400 hover:bg-rose-400 dark:hover:bg-blue-500 text-black dark:text-white px-4 py-2 rounded transition w-full"
				>
					Limpar filtros
				</button>
			</div>
		</form>
	);
}
