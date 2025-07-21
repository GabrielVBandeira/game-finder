import React from 'react';
import Carousel from '../components/layout/Carousel';
import RamMatchCard from '../components/cards/RamMatchCard';
import SearchResults from '../components/filters/SearchResults';
import useRecentGames from '../hooks/useRecentGames';

export default function Home({ searchTerm, onClearSearch }) {
	const { games, loading } = useRecentGames();

	return (
		<div className=" pb-20 pt-6">
			{searchTerm ? (
				<SearchResults
					filters={{
						title: searchTerm,
						genres: [],
						platform: 'all',
						publishers: [],
						developers: [],
					}}
					onClear={onClearSearch}
				/>
			) : (
				<>
					<Carousel games={games} loading={loading} />
					<RamMatchCard />
				</>
			)}
		</div>
	);
}
