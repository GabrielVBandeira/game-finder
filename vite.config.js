import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			'/api/game': {
				target: 'https://www.freetogame.com',
				changeOrigin: true,
				secure: false,
				rewrite: (path) => path.replace(/^\/api\/game/, '/api/game'),
			},
		},
	},
});
