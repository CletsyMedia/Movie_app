import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Card from "@/components/ui/Card";

interface Movie {
  id: number;
  title: string;
  name: string;
  genre: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  popularity: number;
  overview: string;
  release_date: string;
  media_type: string;
}

interface ScrollingProps {
  data: Movie[];
  heading: string;
}

const Scrolling: React.FC<ScrollingProps> = ({ data = [], heading }) => {
  // Generate unique IDs for each carousel instance
  const prevButtonId = `prev-btn-${heading.replace(/\s+/g, "-").toLowerCase()}`;
  const nextButtonId = `next-btn-${heading.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className="relative my-10">
      {/* Swiper Carousel */}
      <div className="relative w-[95%] md:w-[97%] mx-auto">
        <h3 className="text-lg md:text-2xl capitalize font-bold text-white mt-6 mb-2">
          {heading}
        </h3>
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView="auto"
          navigation={{
            nextEl: `#${nextButtonId}`,
            prevEl: `#${prevButtonId}`,
          }}
          touchStartPreventDefault={false}
          grabCursor={true}
          className="flex items-center"
        >
          {data.map((movie, index) => (
            <SwiperSlide key={movie.id} className="!w-[250px]">
              <Card data={movie} index={index} label={ heading === "Trending"
      ? "Trending"
      : heading === "Now Playing"
      ? "Playing"
      : heading === "Top Rated"
      ? "Rated"
      : heading === "Popular TV-Show"
      ? "Series"
      : "OnAir"} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Unique Navigation Buttons */}
        <button
          id={prevButtonId}
          className="hidden sm:block absolute top-1/2 -left-4 md:-left-2 transform -translate-y-1/2 bg-black/60 hover:bg-red-500 p-2 cursor-pointer rounded-full text-white transition z-40"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          id={nextButtonId}
          className="hidden sm:block absolute top-1/2 -right-4 md:-right-2 transform -translate-y-1/2 bg-black/60 hover:bg-red-500 p-2 cursor-pointer rounded-full text-white transition z-40"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Scrolling;
