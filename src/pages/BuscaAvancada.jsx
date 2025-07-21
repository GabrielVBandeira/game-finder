import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Filters from '../components/filters/Filters';
import SearchResults from '../components/filters/SearchResults';
import ActiveFilters from '../components/filters/ActiveFilters';

export default function BuscaAvancada() {
	const location = useLocation();
	const initialTitleFromSearch = location.state?.titleFromSearch || '';
	const [searchFilters, setSearchFilters] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);

	const handleSearch = (filters) => {
		if (!filters) {
			setSearchFilters(null);
			setCurrentPage(1);
			return;
		}

		const {
			title,
			genres,
			platform,
			publishers = [],
			developers = [],
		} = filters;

		setSearchFilters({
			title: title.trim(),
			genres,
			platform,
			publishers,
			developers,
		});
		setCurrentPage(1);
	};

	const handleClear = () => {
		setSearchFilters(null);
		setCurrentPage(1);
	};

	const handleRemoveFilter = (key, value) => {
		if (!searchFilters) return;

		const updated = { ...searchFilters };

		if (key === 'title' || key === 'platform') {
			updated[key] = '';
		} else if (Array.isArray(updated[key])) {
			updated[key] = updated[key].filter((item) => item !== value);
		}

		setSearchFilters(updated);
		setCurrentPage(1);
	};

	useEffect(() => {
		if (initialTitleFromSearch) {
			setSearchFilters({
				title: initialTitleFromSearch,
				genres: [],
				publishers: [],
				developers: [],
				platform: 'all',
			});
			setCurrentPage(1);
		}
	}, [initialTitleFromSearch]);

	return (
		<div className="flex flex-col lg:flex-row w-full mx-auto mt-8 gap-8 px-4">
			<div className="w-full lg:w-1/5">
				<Filters
					onSubmit={handleSearch}
					initialTitle={searchFilters?.title || initialTitleFromSearch}
					filters={searchFilters}
				/>
			</div>

			<div className="flex-1">
				{searchFilters ? (
					<>
						<ActiveFilters
							filters={searchFilters}
							onRemove={handleRemoveFilter}
						/>
						<SearchResults
							filters={searchFilters}
							onClear={handleClear}
							currentPage={currentPage}
							setCurrentPage={setCurrentPage}
						/>
					</>
				) : (
					<p className="text-gray-600 dark:text-gray-300 text-center mt-8">
						Preencha os filtros ao lado para buscar jogos.
					</p>
				)}
			</div>
		</div>
	);
}
