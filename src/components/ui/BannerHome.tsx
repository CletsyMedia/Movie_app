import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import { FaGripLinesVertical } from "react-icons/fa";
import { VscClose } from "react-icons/vsc";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "react-hot-toast";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const BannerHome: React.FC = () => {
  const bannerData = useSelector((state: RootState) => state.movieData.bannerData);
  const imageBaseUrl = "https://image.tmdb.org/t/p/original";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);

  // Swiper reference
  const swiperRef = useRef<any>(null);

  // Function to fetch trailer
  const fetchTrailer = async (movieId: number) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${import.meta.env.VITE_API_KEY}`
      );
      const data = await response.json();

      const trailer = data.results.find(
        (video: any) => video.type === "Trailer" && video.site === "YouTube"
      );

      if (trailer) {
        setTrailerKey(trailer.key);
        setIsModalOpen(true);
      } else {
        toast.error("No trailer available!");
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
      toast.error("Failed to load trailer.");
    }
  };

  return (
    <div className="w-full h-[70vh] md:h-[90vh] relative mt-20 group">
      {Array.isArray(bannerData) && bannerData.length > 0 ? (
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[Pagination, Autoplay, EffectFade]}
          pagination={{
            clickable: true,
            renderBullet: (index, className) =>
              `<span class="${className} w-3 h-3 rounded-full bg-white opacity-80 transition-all duration-300 active:bg-red-600"></span>`,
          }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop
          effect="fade"
          className="w-full h-full relative"
        >
          {bannerData.map((movie, index) => {
            const rating = Number(movie.vote_average).toFixed(1);
            const popularity = Number(movie.popularity).toFixed(0);

            const getBorderColor = (rating: number) => {
              if (rating >= 7) return "border-green-500";
              if (rating >= 5) return "border-yellow-500";
              return "border-red-500";
            };

            return (
              <SwiperSlide key={index} className="relative w-full h-full">
                <img
                  src={`${imageBaseUrl}${movie.backdrop_path}`}
                  alt={movie.title || movie.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent flex flex-col justify-center items-start p-6 md:p-14 text-white">
                  <h1 className="text-lg md:text-4xl font-bold">{movie.title || movie.name}</h1>
                  <p className="block sm:hidden text-sm mt-2 max-w-2xl">
                    {movie.overview.length > 150 ? movie.overview.slice(0, 150) + "..." : movie.overview}
                  </p>
                  <p className="hidden sm:block text-sm md:text-lg mt-2 max-w-2xl">{movie.overview}</p>

                  <div className="flex items-center mt-4 space-x-2">
                    <div className="flex items-center">
                      <span className="text-sm md:text-lg font-semibold mr-2">Rating:</span>
                      <div
                        className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-xs font-bold bg-black text-white rounded-full border-4 ${getBorderColor(
                          Number(rating)
                        )} animate-pulse`}
                      >
                        {rating}
                      </div>
                      <span className="text-sm md:text-lg ml-2">/ 10</span>
                    </div>
                    <span className="text-sm md:text-lg text-red-500">
                      <FaGripLinesVertical />
                    </span>
                    <div className="flex items-center">
                      <span className="text-sm md:text-lg font-semibold mr-2">Views:</span>
                      <span className="text-sm md:text-lg font-bold">{popularity}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => fetchTrailer(movie.id)}
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
              className="absolute top-1/2 left-1px md:left-3 transform -translate-y-1/2 bg-black/60 hover:bg-red-500 p-1 rounded-full text-white transition z-50 cursor-pointer"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="absolute top-1/2 right-[1px] md:right-3 transform -translate-y-1/2 bg-black/60 hover:bg-red-500 p-1 rounded-full text-white transition z-50 cursor-pointer"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </Swiper>
      ) : (
        <p className="text-center text-white">No movies available</p>
      )}

      {/* ✅ Trailer Modal */}
      {isModalOpen && trailerKey && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative w-full max-w-3xl p-6">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-white text-2xl bg-red-500 rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-600 transition cursor-pointer"
            >
              <VscClose />
            </button>
            <iframe
              width="100%"
              height="500px"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Movie Trailer"
              allowFullScreen
              className="rounded-lg shadow-lg"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerHome;
