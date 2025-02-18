// Rating.tsx
import React from "react";

interface RatingProps {
  rating: number | null | undefined;
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
  // Handle invalid or undefined ratings
  const safeRating = rating && !isNaN(rating) ? rating : 0;

  const ratingColor = (rating: number) => {
    if (rating >= 7) return "border-green-500";
    if (rating >= 5) return "border-yellow-500";
    return "border-red-500";
  };

  return (
    <div className="flex items-center">
      <span className="text-sm md:text-lg font-semibold mr-2">Rating:</span>
      <div
        className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-xs font-bold bg-black text-white rounded-full border-4 ${ratingColor(
          safeRating
        )} animate-pulse`}
      >
        {safeRating.toFixed(1)}
      </div>
      <span className="text-sm md:text-lg ml-2">/ 10</span>
    </div>
  );
};

export default Rating;
