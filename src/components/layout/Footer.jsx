import React from 'react';

export default function Footer() {
	return (
		<footer className="mt-10 px-4 py-6 text-sm text-center text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
			<p>
				Game Finder © {new Date().getFullYear()} — Desenvolvido por Gabriel
				Bandeira
			</p>
			<p>
				Dados fornecidos pela{' '}
				<a
					href="https://www.freetogame.com/"
					target="_blank"
					rel="noopener noreferrer"
					className="text-pink-600 dark:text-pink-400 hover:underline"
				>
					FreeToGame API
				</a>
			</p>
		</footer>
	);
}
