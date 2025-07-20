import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const styles = {
	success: {
		bg: 'bg-green-100 dark:bg-green-900',
		text: 'text-green-900 dark:text-green-100',
		border: 'border-l-4 border-green-500 dark:border-green-700',
		icon: 'text-green-600',
		label: 'Success',
	},
	info: {
		bg: 'bg-blue-100 dark:bg-blue-900',
		text: 'text-blue-900 dark:text-blue-100',
		border: 'border-l-4 border-blue-500 dark:border-blue-700',
		icon: 'text-blue-600',
		label: 'Info',
	},
	warning: {
		bg: 'bg-yellow-100 dark:bg-yellow-900',
		text: 'text-yellow-900 dark:text-yellow-100',
		border: 'border-l-4 border-yellow-500 dark:border-yellow-700',
		icon: 'text-yellow-600',
		label: 'Warning',
	},
	error: {
		bg: 'bg-red-100 dark:bg-red-900',
		text: 'text-red-900 dark:text-red-100',
		border: 'border-l-4 border-red-500 dark:border-red-700',
		icon: 'text-red-600',
		label: 'Error',
	},
};

export default function ToastMessage({ type = 'info', message }) {
	const style = styles[type] || styles.info;

	return (
		<motion.div
			role="alert"
			initial={{ opacity: 0, x: 50 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: 50 }}
			transition={{ duration: 0.3 }}
			aria-live="assertive"
			className={`p-3 rounded-lg flex items-center gap-3 shadow-md transform hover:scale-[1.02] transition-all duration-300 ease-in-out
				${style.bg} ${style.text} ${style.border}`}
		>
			<div className={`text-sm font-bold ${style.icon}`}>{style.label}:</div>
			<p className="text-sm font-medium">{message}</p>
		</motion.div>
	);
}
