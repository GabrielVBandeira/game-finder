import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
			<h1 className="text-5xl font-bold mb-4 text-rose-600 dark:text-sky-400">
				404
			</h1>
			<p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
				Página não encontrada.
			</p>
			<Link
				to="/"
				className="bg-rose-500 dark:bg-sky-600 hover:bg-rose-400 dark:hover:bg-sky-500 text-white px-4 py-2 rounded transition"
			>
				Voltar para a Home
			</Link>
		</div>
	);
}
