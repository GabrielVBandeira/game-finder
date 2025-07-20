import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

export default function EmptyState({
	title = 'Nada encontrado',
	description = 'Tente ajustar os filtros ou sua busca.',
	onClose,
}) {
	return (
		<motion.div
			role="alert"
			aria-live="polite"
			initial={{ opacity: 0, y: -10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -10 }}
			transition={{ duration: 0.3 }}
			className="flex flex-col items-center gap-3 w-60 sm:w-72 text-[10px] sm:text-xs z-50 mx-auto"
		>
			<div className="flex items-center justify-between w-full h-14 rounded-lg px-3 bg-gray-100 dark:bg-[#232531] shadow">
				<div className="flex gap-2 items-center">
					<div className="text-[#d65563] bg-white/10 dark:bg-white/5 backdrop-blur p-1 rounded-lg">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-5 h-5"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
							/>
						</svg>
					</div>
					<div className="text-left">
						<p className="text-gray-900 dark:text-white font-medium">{title}</p>
						<p className="text-gray-600 dark:text-gray-400">{description}</p>
					</div>
				</div>

				{onClose && (
					<button
						onClick={onClose}
						aria-label="Fechar alerta"
						className="text-gray-600 hover:bg-black/10 dark:hover:bg-white/10 p-1 rounded-md transition-colors ease-linear"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-5 h-5"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				)}
			</div>

			{/* O link de limpar busca foi removido do EmptyState e deve ser colocado na Navbar */}
		</motion.div>
	);
}
