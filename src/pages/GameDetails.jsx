import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '../components/common/ToastProvider';
import { FaArrowLeft, FaExternalLinkAlt } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import GameDetailsLoader from '../components/common/GameDetailLoader';
import { useGameDetails } from '../hooks/useGameDetails';

export default function GameDetails() {
	const { id } = useParams();
	const { error } = useToast();
	const { game, loading, screenshotsLoaded } = useGameDetails(id, () =>
		error('Jogo não encontrado ou erro ao carregar.'),
	);
	const navigate = useNavigate();

	if (loading) return <GameDetailsLoader />;
	if (!game) return null;

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4 }}
			className="max-w-6xl mx-auto px-4 py-8 text-gray-900 dark:text-white"
		>
			<button
				onClick={() => navigate(-1)}
				className="mb-6 flex items-center gap-2 text-rose-500 dark:text-blue-400 hover:underline text-sm"
			>
				<FaArrowLeft /> Voltar
			</button>

			<div className="mb-8 flex flex-col lg:flex-row gap-6">
				<img
					src={game.thumbnail}
					alt={game.title}
					className="w-full lg:w-[400px] h-[200px] object-cover rounded shadow"
				/>
				<div>
					<h1 className="text-3xl font-bold mb-2">{game.title}</h1>
					<p className="text-gray-600 dark:text-gray-300 text-sm">
						{game.description}
					</p>
				</div>
			</div>

			{game.screenshots?.length > 0 && screenshotsLoaded && (
				<div className="mb-8">
					<h2 className="text-xl font-semibold mb-4">Capturas de tela</h2>
					<Swiper
						modules={[Navigation, Pagination]}
						spaceBetween={10}
						slidesPerView={1}
						navigation={{
							nextEl: '.swiper-button-next-custom',
							prevEl: '.swiper-button-prev-custom',
						}}
						pagination={{
							clickable: true,
							bulletClass: 'swiper-pagination-bullet custom-bullet-detail',
							bulletActiveClass: 'swiper-pagination-bullet-active',
						}}
						className="!pb-10"
					>
						{game.screenshots.map((screenshot) => (
							<SwiperSlide key={screenshot.id}>
								<img
									src={screenshot.image}
									alt={`Screenshot ${screenshot.id}`}
									className="rounded-lg shadow-lg w-full max-h-[500px] object-cover"
								/>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			)}

			{game.minimum_system_requirements && (
				<div className="mb-8">
					<h2 className="text-xl font-semibold mb-2">Requisitos mínimos</h2>
					{Object.values(game.minimum_system_requirements).every(
						(value) => value === null || value === '',
					) ? (
						<p className="text-sm text-gray-500 dark:text-gray-400">
							Este jogo não possui requisitos mínimos informados.
						</p>
					) : (
						<ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
							{Object.entries(game.minimum_system_requirements).map(
								([key, value]) => (
									<li key={key}>
										<strong className="capitalize">
											{key.replaceAll('_', ' ')}:
										</strong>{' '}
										{value ?? 'Não informado'}
									</li>
								),
							)}
						</ul>
					)}
				</div>
			)}

			<div className="mt-6">
				<a
					href={game.game_url}
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex items-center gap-2 bg-rose-500 dark:bg-sky-700 hover:bg-rose-400 dark:hover:bg-sky-500 px-4 py-2 rounded text-white font-semibold transition"
				>
					Jogar agora <FaExternalLinkAlt size={14} />
				</a>
			</div>
		</motion.div>
	);
}
