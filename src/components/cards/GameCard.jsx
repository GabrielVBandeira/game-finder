import React from 'react';
import { Link } from 'react-router-dom';
import {
	FaCalendarAlt,
	FaDesktop,
	FaTags,
	FaIndustry,
	FaCode,
} from 'react-icons/fa';

export default function GameCard({ game }) {
	return (
		<div
			className="bg-rose-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-2xl shadow p-4 
				hover:bg-rose-200 dark:hover:bg-gray-900 hover:shadow-2xl dark:hover:shadow-sky-400 hover:shadow-pink-300
				transition-shadow w-full max-w-[400px] h-[440px] flex flex-col justify-between mx-auto gap-3"
			aria-label={`Card do jogo ${game.title}`}
		>
			<img
				src={game.thumbnail}
				alt={`Capa de ${game.title}`}
				className="w-full h-40 object-cover rounded-2xl"
				loading="lazy"
			/>

			<div>
				<p className="font-extrabold text-sm sm:text-base line-clamp-1">
					{game.title}
				</p>
				<p className="text-xs sm:text-sm line-clamp-2">
					{game.short_description}
				</p>
			</div>

			<div className="text-[10px] sm:text-xs flex flex-col gap-1">
				<p className="flex items-center gap-1" title="Data de lançamento">
					<FaCalendarAlt className="text-blue-400" />
					{game.release_date}
				</p>
				<p className="flex items-center gap-1" title="Plataforma">
					<FaDesktop className="text-green-400" />
					{game.platform}
				</p>
				<p className="flex items-center gap-1" title="Gênero">
					<FaTags className="text-purple-400" />
					{game.genre}
				</p>
				<p className="flex items-center gap-1" title="Publicadora">
					<FaIndustry className="text-yellow-400" />
					{game.publisher}
				</p>
				<p className="flex items-center gap-1" title="Desenvolvedora">
					<FaCode className="text-red-400" />
					{game.developer}
				</p>
			</div>

			<Link
				to={`/jogo/${game.id}`}
				className="bg-rose-500 hover:bg-rose-400 dark:bg-sky-700 font-extrabold text-white text-xs sm:text-sm p-2 px-4 rounded-xl dark:hover:bg-sky-500 transition-colors mt-auto text-center"
				title="Ver detalhes do jogo"
			>
				Saiba mais
			</Link>
		</div>
	);
}
