import React from 'react';
import { FaTimes } from 'react-icons/fa';

export default function ActiveFilters({ filters, onRemove }) {
	const { title, genres, platform, publishers, developers } = filters;

	const getPillClass = (active) =>
		`px-3 py-1 rounded-full text-sm font-medium border transition inline-flex items-center gap-2 ${
			active
				? 'bg-rose-500 dark:bg-sky-600 text-white'
				: 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-rose-200 dark:hover:bg-sky-700'
		}`;

	const renderTag = (label, value, key) => (
		<button
			key={`${key}-${value}`}
			onClick={() => onRemove(key, value)}
			className={getPillClass(true)}
			title={`Remover filtro: ${label}`}
		>
			{label}
			<FaTimes className="text-xs" />
		</button>
	);

	const tags = [];

	if (title) tags.push(renderTag(title, title, 'title'));
	if (platform && platform !== 'all')
		tags.push(renderTag(platform, platform, 'platform'));
	genres?.forEach((g) => tags.push(renderTag(g, g, 'genres')));
	publishers?.forEach((p) => tags.push(renderTag(p, p, 'publishers')));
	developers?.forEach((d) => tags.push(renderTag(d, d, 'developers')));

	if (tags.length === 0) return null;

	return <div className="flex flex-wrap items-center gap-2 mb-4">{tags}</div>;
}
