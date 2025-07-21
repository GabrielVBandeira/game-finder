import React from 'react';

const LOADER_COUNT = 8;

export default function Loader() {
	return (
		<div
			className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 px-4 py-6"
			role="presentation"
			aria-hidden="true"
		>
			{Array.from({ length: LOADER_COUNT }).map((_, idx) => (
				<div
					key={idx}
					className="flex flex-col w-full max-w-[400px] h-[440px] bg-neutral-200 dark:bg-gray-700 animate-pulse rounded-2xl p-4 gap-4 shadow-md"
				>
					<div className="bg-neutral-400/50 dark:bg-gray-600 w-full h-40 rounded-lg" />
					<div className="flex flex-col gap-2">
						<div className="bg-neutral-400/50 dark:bg-gray-600 w-3/4 h-4 rounded" />
						<div className="bg-neutral-400/50 dark:bg-gray-600 w-2/3 h-4 rounded" />
						<div className="bg-neutral-400/50 dark:bg-gray-600 w-4/5 h-4 rounded" />
						<div className="bg-neutral-400/50 dark:bg-gray-600 w-1/2 h-4 rounded" />
					</div>
				</div>
			))}
		</div>
	);
}
