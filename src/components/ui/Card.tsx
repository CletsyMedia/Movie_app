import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { Film } from "lucide-react";
import { CardProps } from "../../constants/Types.ts";

const Card: React.FC<CardProps> = ({ data, index, label }) => {
  const title = data?.title || data?.name;
  const releaseDate = moment(data.release_date).format("MMM DD, YYYY");

  const posterPath = data?.poster_path
    ? `https://image.tmdb.org/t/p/original${data.poster_path}`
    : data?.backdrop_path
    ? `https://image.tmdb.org/t/p/original${data.backdrop_path}`
    : null;

  return (
    <Link
      to={`/${data.media_type === "tv" ? "tv" : "movie"}/${data.id}`}
      className="relative group overflow-hidden rounded-xl shadow-lg transition duration-300 hover:shadow-xl w-full max-w-full md:max-w-[350px] h-[500px] sm:h-[400px] flex flex-col"
    >
      <div className="relative w-full min-h-[500px] sm:min-h-[400px] aspect-[2/3] overflow-hidden rounded-xl bg-gray-900">
        {posterPath ? (
          <img
            src={posterPath}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex justify-center items-center bg-gray-700 text-white text-xl">
            <Film size={40} />
          </div>
        )}
      </div>

      {/* Badge */}
      <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-md shadow-md">
        #{label} {index + 1}
      </div>
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
