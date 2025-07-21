import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import ToastMessage from '../layout/ToastMessage.jsx';

const ToastContext = createContext();

export function ToastProvider({ children }) {
	const [toasts, setToasts] = useState([]);

	const showToast = useCallback((toast) => {
		const id = Date.now();
		setToasts((prev) => [...prev, { ...toast, id }]);

		setTimeout(() => {
			setToasts((prev) => prev.filter((t) => t.id !== id));
		}, toast.duration || 3000);
	}, []);

	const success = (message, duration) =>
		showToast({ type: 'success', message, duration });
	const error = (message, duration) =>
		showToast({ type: 'error', message, duration });
	const info = (message, duration) =>
		showToast({ type: 'info', message, duration });
	const warning = (message, duration) =>
		showToast({ type: 'warning', message, duration });

	return (
		<ToastContext.Provider value={{ showToast, success, error, info, warning }}>
			{children}
			<div className="fixed top-24 right-4 z-50 flex flex-col gap-2 max-w-xs">
				<AnimatePresence>
					{toasts.map((toast) => (
						<ToastMessage key={toast.id} {...toast} />
					))}
				</AnimatePresence>
			</div>
		</ToastContext.Provider>
	);
}

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => useContext(ToastContext);
