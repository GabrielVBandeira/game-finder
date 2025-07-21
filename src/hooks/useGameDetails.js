import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useGameDetails(id, onError) {
	const [game, setGame] = useState(null);
	const [loading, setLoading] = useState(true);
	const [screenshotsLoaded, setScreenshotsLoaded] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchGame = async () => {
			try {
				const res = await fetch(`/api/game?id=${id}`);
				const data = await res.json();

				if (data?.status === 0 || data?.error || !data?.id) {
					throw new Error('Jogo não encontrado');
				}

				setGame(data);
				if (data?.screenshots?.length > 0) {
					const preload = data.screenshots.map((screenshot) => {
						return new Promise((resolve) => {
							const img = new Image();
							img.src = screenshot.image;
							img.onload = resolve;
							img.onerror = resolve;
						});
					});
					Promise.all(preload).then(() => setScreenshotsLoaded(true));
				} else {
					setScreenshotsLoaded(true);
				}
			} catch {
				onError?.();
				navigate('/');
			} finally {
				setTimeout(() => setLoading(false), 600);
			}
		};

		fetchGame();
	}, [id, onError, navigate]);

	return { game, loading, screenshotsLoaded };
}
