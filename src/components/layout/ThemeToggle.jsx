import React from 'react';

export default function ThemeToggle() {
	const toggleTheme = () => {
		const root = document.documentElement;
		const isDark = root.classList.contains('dark');

		if (isDark) {
			root.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		} else {
			root.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		}
	};

	return (
		<div
			aria-label="Alternar tema"
			className="w-28 h-16 rounded-xl border-2 border-[#121331] bg-[#ebe6ef] dark:bg-[#3a3347]"
		>
			<div className="flex h-full w-full px-2 items-center gap-x-1">
				<div className="w-4 h-4 flex-shrink-0 rounded-full border-4 border-[#121331]"></div>
				<label
					htmlFor="switch"
					className="has-[:checked]:scale-x-[-1] w-full h-4 border-4 border-[#121331] rounded cursor-pointer"
				>
					<input
						role="switch"
						type="checkbox"
						id="switch"
						className="hidden"
						onClick={toggleTheme}
					/>
					<div className="w-full h-full bg-[#f24c00] relative">
						<div className="w-0 h-0 z-20 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[12px] border-t-[#121331] relative">
							<div className="w-0 h-0 absolute border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[8px] border-t-[#e44901] -top-3 -left-[10px]"></div>
						</div>
						<div className="w-[14px] h-3 z-10 absolute top-[5px] left-0 bg-[#f24c00] border-r-2 border-b-4 border-[#121331] transform skew-y-[39deg]"></div>
						<div className="w-[14px] h-3 z-10 absolute top-[5px] left-[14px] bg-[#c44002] border-r-2 border-l-2 border-b-4 border-[#121331] transform skew-y-[-39deg]"></div>
					</div>
				</label>
				<div className="w-4 h-1 flex-shrink-0 bg-[#121331] rounded-full"></div>
			</div>
		</div>
	);
}
