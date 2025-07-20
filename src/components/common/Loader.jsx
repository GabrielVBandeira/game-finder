import React from 'react';

export default function Loader() {
	return (
		<div className="grid gap-4 mt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			{Array.from({ length: 12 }).map((_, idx) => (
				<div
					key={idx}
					className="flex flex-col bg-neutral-300 dark:bg-gray-700 w-full h-64 animate-pulse rounded-xl p-4 gap-4"
				>
					<div className="bg-neutral-400/50 dark:bg-gray-600 w-full h-32 rounded-md"></div>
					<div className="flex flex-col gap-2">
						<div className="bg-neutral-400/50 dark:bg-gray-600 w-full h-4 rounded-md"></div>
						<div className="bg-neutral-400/50 dark:bg-gray-600 w-4/5 h-4 rounded-md"></div>
						<div className="bg-neutral-400/50 dark:bg-gray-600 w-full h-4 rounded-md"></div>
						<div className="bg-neutral-400/50 dark:bg-gray-600 w-2/4 h-4 rounded-md"></div>
					</div>
				</div>
			))}
		</div>
	);
}
