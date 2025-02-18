import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import { FaGripLinesVertical } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Swiper as SwiperType } from "swiper";
import Loader from "@/components/common/Loader";
import Rating from "@/components/common/Rating";

const BannerHome: React.FC = () => {
  const bannerData = useSelector(
    (state: RootState) => state.movieData.bannerData
  );
  const imageBaseUrl = "https://image.tmdb.org/t/p/original";

  // Swiper reference
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="w-full h-[70vh] md:h-[90vh] relative mt-20 group">
      {Array.isArray(bannerData) && bannerData.length > 0 ? (
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[Pagination, Autoplay, EffectFade]}
          pagination={{
            clickable: true,
            renderBullet: (index, className) =>
              `<span class="${className} w-6 h-6 rounded-full bg-white opacity-80 transition-all duration-300 active:bg-red-600"></span>`,
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          effect="fade"
          className="w-full h-full relative"
        >
          {bannerData.map((movie, index) => {
            const rating = Number(movie.vote_average);
            const popularity = Number(movie.popularity).toFixed(0);

            return (
              <SwiperSlide key={index} className="relative w-full h-full">
                <img
                  src={`${imageBaseUrl}${movie.backdrop_path}`}
                  alt={movie.title || movie.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div
                  key={movie.id + "bannerHome" + index}
                  className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent flex flex-col justify-center items-start p-6 md:p-14 text-white"
                >
                  <h1 className="text-lg md:text-4xl font-bold">
                    {movie.title || movie.name}
                  </h1>
                  <p className="block sm:hidden text-sm mt-2 max-w-2xl">
                    {movie.overview.length > 150
                      ? movie.overview.slice(0, 200) + "..."
                      : movie.overview}
                  </p>
                  <p className="hidden sm:block text-sm md:text-lg mt-2 max-w-2xl">
                    {movie.overview}
                  </p>

                  <div className="flex items-center mt-4 space-x-2">
                    <Rating rating={rating} />
                    <span className="text-sm md:text-lg text-red-500">
                      <FaGripLinesVertical />
                    </span>
                    <div className="flex items-center">
                      <span className="text-sm md:text-lg font-semibold mr-2">
                        Views:
                      </span>
                      <span className="text-sm md:text-lg font-bold">
                        {popularity}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => alert("Play button clicked!")}
                    className="mt-6 px-6 py-2 bg-red-600 hover:bg-red-700 transition-all duration-300 text-white text-sm md:text-lg font-semibold rounded-lg shadow-md cursor-pointer"
                  >
                    ▶ Play Now
                  </button>
                </div>
              </SwiperSlide>
            );
          })}

          {/* ✅ Navigation Buttons (Fixed Position) */}
          <div className="absolute top-0 w-full h-full flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="absolute top-1/2 left-1px md:left-3 transform -translate-y-1/2 bg-black/60 hover:bg-red-500 p-3 rounded-full text-white transition z-40 cursor-pointer"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="absolute top-1/2 right-[1px] md:right-3 transform -translate-y-1/2 bg-black/60 hover:bg-red-500 p-3 rounded-full text-white transition z-40 cursor-pointer"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </Swiper>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default BannerHome;
