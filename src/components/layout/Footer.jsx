import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

export default function Footer() {
	return (
		<motion.footer
			role="contentinfo"
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4 }}
			className="w-full px-4 py-6 text-sm text-center border-t bg-rose-100 dark:bg-gray-800 backdrop-blur-md border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400"
		>
			<p>
				<span className="font-semibold text-gray-800 dark:text-white">
					Game Finder
				</span>{' '}
				© {new Date().getFullYear()} — Desenvolvido por Gabriel Bandeira
			</p>
			<p className="mt-1">
				Dados da{' '}
				<a
					href="https://www.freetogame.com/"
					target="_blank"
					rel="noopener noreferrer"
					className="text-pink-600 dark:text-sky-300 hover:underline"
				>
					FreeToGame API
				</a>
			</p>
		</motion.footer>
	);
}
