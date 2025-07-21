/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../common/ToastProvider';

export default function RamMatchCard() {
	const [ramInput, setRamInput] = useState('');
	const [loading, setLoading] = useState(false);
	const [matchedGame, setMatchedGame] = useState(null);
	const [cardOpened, setCardOpened] = useState(false);
	const [imageLoaded, setImageLoaded] = useState(false);
	const [lifted, setLifted] = useState(false);
	const { error: toastError } = useToast();
	const navigate = useNavigate();

	const MIN_RAM = 2;
	const MAX_RAM = 64;

	useEffect(() => {
		if (cardOpened) {
			const timeout = setTimeout(() => setLifted(true), 1000);
			return () => clearTimeout(timeout);
		} else {
			setLifted(false);
		}
	}, [cardOpened]);

	const handleSearch = async () => {
		const ramValue = parseInt(ramInput, 10);
		if (isNaN(ramValue) || ramValue < MIN_RAM || ramValue > MAX_RAM) {
			toastError(`Digite um valor entre ${MIN_RAM} e ${MAX_RAM} GB.`);
			return;
		}

		setLoading(true);
		setMatchedGame(null);
		setCardOpened(false);
		setImageLoaded(false);

		try {
			const res = await fetch('/api/games');
			const games = await res.json();
			const shuffled = games.sort(() => 0.5 - Math.random());

			for (const { id } of shuffled) {
				const res = await fetch(`/api/game?id=${id}`);
				const game = await res.json();
				const ramStr = game.minimum_system_requirements?.memory || '';
				const match = ramStr.match(/(\d+)\s*GB/i);

				if (match && parseInt(match[1]) <= ramValue) {
					setMatchedGame(game);
					return;
				}
			}

			toastError('Nenhum jogo compatível encontrado.');
		} catch {
			toastError('Erro ao buscar jogo. Tente novamente.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="bg-rose-100 dark:bg-gray-800 mt-32 p-6 rounded-2xl shadow-md max-w-5xl mx-auto text-center transition-colors flex flex-col-reverse lg:flex-row items-center justify-between gap-6">
			{/* Esquerda */}
			<div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-4 max-w-md lg:max-w-none lg:flex-1">
				<motion.h2
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					className="text-xl font-bold text-gray-900 dark:text-white"
				>
					Descubra um jogo com a sua RAM disponível!
				</motion.h2>
				<p className="text-sm text-gray-600 dark:text-gray-400">
					Digite sua RAM abaixo e ache um jogo divertido e leve pro seu setup!
				</p>

				<input
					type="number"
					value={ramInput}
					onChange={(e) => setRamInput(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === 'Enter') handleSearch();
					}}
					min={MIN_RAM}
					max={MAX_RAM}
					placeholder="Ex: 8 (em GB)"
					className="p-2 rounded-xl border text-center w-full max-w-sm dark:bg-gray-700 dark:text-white text-black border-gray-300 dark:border-gray-700"
					aria-label="Digite sua memória RAM disponível"
				/>

				<button
					onClick={handleSearch}
					disabled={loading}
					className="bg-rose-500 hover:bg-rose-400 dark:bg-sky-700 dark:hover:bg-sky-500 text-white px-4 py-2 rounded-xl font-semibold transition"
				>
					{loading ? (
						<span className="flex items-center justify-center gap-2">
							<FaSpinner className="animate-spin" /> Buscando...
						</span>
					) : (
						'Encontrar jogo'
					)}
				</button>
			</div>

			{/* Direita: Carta */}
			<div className="flex flex-col items-center lg:flex-1">
				<div className="relative bg-black w-[300px] sm:w-[350px] aspect-video group transition-all duration-700 flex items-center justify-center">
					<div
						className={`absolute w-full h-full flex items-center justify-center bg-white transition-all duration-300 ${
							lifted ? '-translate-y-28' : 'translate-y-0'
						}`}
					>
						{matchedGame && (
							<motion.img
								initial={{ opacity: 0 }}
								animate={{ opacity: imageLoaded ? 1 : 0 }}
								transition={{ duration: 0.5 }}
								src={matchedGame.thumbnail}
								alt={matchedGame.title}
								onLoad={() => {
									setImageLoaded(true);
									setTimeout(() => setCardOpened(true), 300);
								}}
								className="w-full h-full object-cover rounded shadow"
							/>
						)}
					</div>

					{/* Selo RAM */}
					<button
						className={`seal bg-rose-500 text-white w-10 aspect-square rounded-full z-40 text-[10px] flex items-center justify-center font-bold [clip-path:polygon(50%_0%,_80%_10%,_100%_35%,_100%_70%,_80%_90%,_50%_100%,_20%_90%,_0%_70%,_0_35%,_20%_10%)] transition-all duration-1000 ${
							cardOpened ? 'opacity-0 scale-0 rotate-180' : 'opacity-100'
						}`}
						aria-hidden
					>
						RAM
					</button>

					{/* Animações de carta */}
					<div
						className={`tp absolute w-full h-full bg-neutral-800 transition-all duration-1000 ${
							cardOpened
								? '[clip-path:polygon(50%_0%,_100%_0,_0_0)]'
								: '[clip-path:polygon(50%_50%,_100%_0,_0_0)]'
						}`}
					/>
					<div
						className={`lft absolute w-full h-full bg-neutral-900 transition-all duration-700 ${
							cardOpened
								? '[clip-path:polygon(50%_50%,_0_0,_0_100%)]'
								: '[clip-path:polygon(50%_50%,_0_0,_0_100%)]'
						}`}
					/>
					<div
						className={`rgt absolute w-full h-full bg-neutral-800 transition-all duration-700 ${
							cardOpened
								? '[clip-path:polygon(50%_50%,_100%_0,_100%_100%)]'
								: '[clip-path:polygon(50%_50%,_100%_0,_100%_100%)]'
						}`}
					/>
					<div
						className={`btm absolute w-full h-full bg-neutral-900 transition-all duration-700 ${
							cardOpened
								? '[clip-path:polygon(50%_50%,_100%_100%,_0_100%)]'
								: '[clip-path:polygon(50%_50%,_100%_100%,_0_100%)]'
						}`}
					/>
				</div>

				{/* Conteúdo após abrir a carta */}
				{matchedGame && cardOpened && (
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						className="mt-4 px-2 text-center max-w-xs"
					>
						<p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
							{matchedGame.short_description}
						</p>
						<button
							onClick={() => navigate(`/jogo/${matchedGame.id}`)}
							className="mt-3 inline-block text-sm text-white font-bold bg-rose-500 dark:bg-sky-700 px-4 py-1 rounded hover:bg-rose-400 dark:hover:bg-sky-500 transition"
						>
							Saiba mais
						</button>
					</motion.div>
				)}
			</div>
		</div>
	);
}
