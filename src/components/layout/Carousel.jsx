import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import GameCard from '../cards/GameCard';

export default function CarouselSwiper({ games }) {
	return (
		<section className="px-3 py-6">
			<h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
				Jogos Recentes
			</h2>

			<div className="relative flex justify-center">
				<Swiper
					key={games.length}
					modules={[Autoplay, Navigation, Pagination]}
					spaceBetween={45}
					slidesPerView={3}
					loop={true}
					navigation={{
						nextEl: '.swiper-button-next-custom',
						prevEl: '.swiper-button-prev-custom',
					}}
					pagination={{
						clickable: true,
						el: '.custom-pagination',
						bulletClass: 'swiper-pagination-bullet custom-bullet',
						bulletActiveClass: 'swiper-pagination-bullet-active',
					}}
					autoplay={{
						delay: 3000,
						disableOnInteraction: false,
						pauseOnMouseEnter: true,
					}}
					breakpoints={{
						320: { slidesPerView: 1 },
						640: { slidesPerView: 2 },
						1024: { slidesPerView: 3 },
					}}
					className="w-full py-10 px-10 max-w-[1246px] min-h-[550px]"
				>
					{games.map((game) => (
						<SwiperSlide key={game.id}>
							<GameCard game={game} />
						</SwiperSlide>
					))}
				</Swiper>

				<button
					className="swiper-button-prev-custom absolute top-1/2 left-0 lg:-left-10 -translate-y-1/2 z-10 p-2"
					aria-label="Anterior"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-8 h-8 text-pink-600 dark:text-sky-400 hover:text-pink-400 dark:hover:text-sky-300 transition"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15.75 19.5L8.25 12l7.5-7.5"
						/>
					</svg>
				</button>

				<button
					className="swiper-button-next-custom absolute top-1/2 right-0 lg:-right-10 -translate-y-1/2 z-10 p-2"
					aria-label="Próxima"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-8 h-8 text-pink-600 dark:text-sky-400 hover:text-pink-400 dark:hover:text-sky-300 transition"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M8.25 4.5l7.5 7.5-7.5 7.5"
						/>
					</svg>
				</button>
			</div>

			<div className="custom-pagination flex justify-center space-x-1" />
		</section>
	);
}
