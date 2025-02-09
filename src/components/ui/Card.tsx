import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { Movie } from "@/store/slice/movieSlice";

interface CardProps {
  data: Movie;
  index: number;
  label: string;
}

const Card: React.FC<CardProps> = ({ data, index, label }) => {
  const title = data?.title || data?.name;
  const releaseDate = moment(data.release_date).format("MMM DD, YYYY");

  // Ensure consistent image source
  const posterPath = data?.poster_path
    ? `https://image.tmdb.org/t/p/w780${data.poster_path}`
    : data?.backdrop_path
    ? `https://image.tmdb.org/t/p/w780${data.backdrop_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <Link
      to={`/${data.media_type || 'movie'}/${data.id}`}
      className="relative group overflow-hidden rounded-xl shadow-lg transition duration-300 hover:shadow-xl w-64 h-[400px] flex flex-col"
    >
      {/* Image Container with Fixed Aspect Ratio */}
      <div className="relative w-full min-h-[400px] aspect-[2/3] overflow-hidden rounded-xl bg-gray-900">
        <img
          src={posterPath}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Trending Badge */}
      <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-md shadow-md">
        #{label} {index + 1}
      </div>

      {/* Overlay Gradient + Movie Info */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-4">
        <div className="flex flex-col space-y-2 w-full">
          <h2 className="text-white text-lg font-semibold truncate">{title}</h2>
          <div className="flex justify-between text-white text-sm font-bold w-full">
            <p>{releaseDate}</p>
            <p>{data.vote_average?.toFixed(1) ?? "N/A"}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
