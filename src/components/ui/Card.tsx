import React from 'react';

const Card = ({ data, index }) => {
    return (
        <div className="relative group overflow-hidden rounded-xl shadow-lg transform transition duration-300 hover:scale-105">
            {/* Movie Poster */}
            <img
                src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                alt={data?.title || data?.name}
                className="w-full h-96 object-cover object-center"
            />

            {/* Trending Badge */}
            <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-lg shadow-md">
                #Trending {index + 1}
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-4">
                <h2 className="text-white text-lg font-semibold">{data?.title || data?.name}</h2>
            </div>
        </div>
    );
};

export default Card;
