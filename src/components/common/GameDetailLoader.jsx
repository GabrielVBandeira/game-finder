import React from 'react';

export default function GameDetailsLoader() {
	return (
		<div
			className="max-w-6xl mx-auto px-4 py-8 animate-pulse"
			role="presentation"
			aria-hidden="true"
		>
			<div className="mb-6 h-4 w-24 bg-neutral-300 dark:bg-gray-600 rounded" />

			<div className="flex flex-col lg:flex-row gap-6 mb-10">
				<div className="w-full lg:w-[400px] h-[200px] bg-neutral-300 dark:bg-gray-600 rounded shadow" />

				<div className="flex flex-col gap-4 flex-1">
					<div className="h-6 w-3/4 bg-neutral-300 dark:bg-gray-600 rounded" />
					<div className="h-4 w-full bg-neutral-300 dark:bg-gray-600 rounded" />
					<div className="h-4 w-5/6 bg-neutral-300 dark:bg-gray-600 rounded" />
					<div className="h-4 w-4/6 bg-neutral-300 dark:bg-gray-600 rounded" />
				</div>
			</div>

			<div className="mb-10 space-y-4">
				<div className="h-5 w-40 bg-neutral-300 dark:bg-gray-600 rounded" />
				<div className="w-full h-[300px] bg-neutral-300 dark:bg-gray-600 rounded-lg" />
			</div>

			<div className="mb-10 space-y-3">
				<div className="h-5 w-40 bg-neutral-300 dark:bg-gray-600 rounded" />
				{Array.from({ length: 5 }).map((_, idx) => (
					<div
						key={idx}
						className="h-4 w-2/3 bg-neutral-300 dark:bg-gray-600 rounded"
					/>
				))}
			</div>

			<div className="h-10 w-40 bg-neutral-300 dark:bg-gray-600 rounded" />
		</div>
	);
}
