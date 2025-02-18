import React, { useEffect, useCallback, useState } from "react";
import AxiosInstance from "@/api/AxiosInstance";
import { useParams } from "react-router-dom";
import Loader from "@/components/common/Loader";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Scrolling from "@/components/common/Scrolling";
import useFetchData from "@/hooks/useFetchData";
import Rating from "@/components/common/Rating";
import ReactPlayer from "react-player";
import { IoPlayCircleOutline } from "react-icons/io5";
import { SlClose } from "react-icons/sl";
import moment from "moment";
import { MediaDetails, Movie } from "@/constants/Types";

const DetailsPage = () => {
  const { explore, id } = useParams();
  const [mediaDetails, setMediaDetails] = useState<MediaDetails | null>(null);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [showTrailer, setShowTrailer] = useState<boolean>(false);
  const [similarMedia, setSimilarMedia] = useState<Movie[]>([]);
  const [recommendation, setRecommendation] = useState<Movie[]>([]);

  const trendingMovies =
    useSelector((state: RootState) =>
      Array.isArray(state.movieData.bannerData)
        ? state.movieData.bannerData
        : []
    ) || [];

  const { fetchData } = useFetchData();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const fetchMediaDetails = useCallback(async () => {
    if (!id) return;

    const endpoint = explore === "tv" ? `/tv/${id}` : `/movie/${id}`;
    const videosEndpoint =
      explore === "tv" ? `/tv/${id}/videos` : `/movie/${id}/videos`;
    const creditsEndpoint =
      explore === "tv" ? `/tv/${id}/credits` : `/movie/${id}/credits`;
    const similarEndpoint =
      explore === "tv" ? `/tv/${id}/similar` : `/movie/${id}/similar`;
    const recommendationEndpoint =
      explore === "tv"
        ? `/tv/${id}/recommendations`
        : `/movie/${id}/recommendations`;

    try {
      const [
        detailsResponse,
        videosResponse,
        creditsResponse,
        similarResponse,
        recommendationResponse,
      ] = await Promise.all([
        AxiosInstance.get(endpoint),
        AxiosInstance.get(videosEndpoint),
        AxiosInstance.get(creditsEndpoint),
        AxiosInstance.get(similarEndpoint),
        AxiosInstance.get(recommendationEndpoint),
      ]);

      setMediaDetails(detailsResponse.data);

      // Find the trailer in the videos response
      const trailer = videosResponse.data.results.find(
        (video: { type: string; site: string; key: string }) =>
          video.type === "Trailer" && video.site === "YouTube"
      );

      if (trailer) {
        setTrailerKey(trailer.key);
      }

      // Set the credits data
      setMediaDetails((prevDetails) => ({
        ...prevDetails,
        credits: creditsResponse.data,
      }));
      setSimilarMedia(similarResponse.data.results);
      setRecommendation(recommendationResponse.data.results);
    } catch (error) {
      console.error("Error fetching media details:", error);
    } finally {
      setIsLoading(false);
    }
  }, [explore, id]);

  useEffect(() => {
    fetchMediaDetails();
  }, [fetchMediaDetails]);

  const imageBaseUrl = "https://image.tmdb.org/t/p/original";
  const imageUrl = mediaDetails?.backdrop_path || mediaDetails?.poster_path;
  const posterUrl = mediaDetails?.poster_path;
  const rating = mediaDetails?.vote_average;
  const year =
    mediaDetails?.release_date?.split("-")[0] ||
    mediaDetails?.first_air_date?.split("-")[0];

  const formatRuntime = (runtimeInMinutes: number) => {
    const hours = Math.floor(runtimeInMinutes / 60);
    const minutes = runtimeInMinutes % 60;

    let formattedRuntime = "";

    if (hours > 0) {
      formattedRuntime += `${hours}hr${hours !== 1 ? "s" : ""} `;
    }

    if (minutes > 0) {
      formattedRuntime += `${minutes}min${minutes !== 1 ? "s" : ""}`;
    }

    return formattedRuntime.trim();
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const toggleTrailer = () => {
    setShowTrailer(!showTrailer);
  };

  return (
    <div className="pt-24 relative">
      {/* Background Image Section */}
      <div className="absolute w-full h-[40rem] top-0 left-0 right-0">
        {isLoading ? (
          <div className="flex justify-center items-center h-full text-white">
            <Loader />
          </div>
        ) : (
          imageUrl && (
            <img
              src={`${imageBaseUrl}${imageUrl}`}
              alt={mediaDetails?.title || mediaDetails?.name || "Media Image"}
              className="w-full h-full object-cover"
              loading="lazy"
              onLoad={handleImageLoad}
            />
          )
        )}
        {/* Gradient Overlay - only show after image load */}
        {imageLoaded && (
          <div className="absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900 via-neutral-900/70 to-transparent"></div>
        )}
      </div>

      {/* Media Details Card */}
      {mediaDetails && (
        <div className="w-[98%] lg:w-[87%] absolute top-[43rem] sm:top-[40rem] md:top-[30rem] left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 bg-gray-900/70 rounded-lg flex flex-col md:flex-row items-start gap-6 z-20 backdrop-blur-sm">
          {/* Poster and Trailer Section */}
          <div className="w-full md:w-[23rem] h-[33rem] sm:h-[30rem] md:h-[25rem] relative">
            {!showTrailer && (
              <>
                <img
                  src={`${imageBaseUrl}${posterUrl}`}
                  alt={mediaDetails.title || mediaDetails.name}
                  className="w-full h-full object-cover border-1 border-white rounded-lg"
                  loading="lazy"
                />
                {/* Poster Overlay */}
                <div className="absolute inset-0 bg-black/30 hover:bg-black/40 transition-all rounded-lg"></div>
              </>
            )}

            {/* Trailer Overlay */}
            {trailerKey && (
              <div className="absolute inset-0 flex items-center justify-center">
                {showTrailer ? (
                  <div className="w-full h-full relative">
                    <ReactPlayer
                      url={`https://www.youtube.com/watch?v=${trailerKey}`}
                      controls={true}
                      width="100%"
                      height="100%"
                      playing={true}
                      className="rounded-lg"
                    />
                    {/* Close Button */}
                    <button
                      onClick={toggleTrailer}
                      className="absolute top-2 text-white right-2 hover:text-red-600/70 transition-all cursor-pointer"
                    >
                      <SlClose size={24} className="hover:text-red-600" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={toggleTrailer}
                    className="bg-red-800/50 rounded-full p-4 hover:bg-red-600/70 transition-all cursor-pointer"
                  >
                    <IoPlayCircleOutline size={24} className="text-white" />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Media Details Content */}
          <div className="w-full text-white">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
              <div className="flex flex-col items-start">
                <h1 className="text-2xl lg:text-3xl font-semibold">
                  {mediaDetails?.title || mediaDetails?.name}{" "}
                  <span className="text-sm text-gray-400">{year}</span>
                </h1>
                <h2 className="text-lg">{mediaDetails?.tagline}</h2>
              </div>
              <div className="mt-4 md:mt-0">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all">
                  Subscribe to Watch | $0.00
                </button>
              </div>
            </div>

            {/* Rating Section */}
            <div className="mt-4">
              <div className="flex items-center text-gray-400 space-x-1">
                <Rating rating={rating} />
                <span>by {mediaDetails?.vote_count} users</span>
              </div>
            </div>

            {/* Description Section */}
            <div className="mt-6 text-gray-300">
              <p className="max-h-[15rem] overflow-hidden">
                {mediaDetails?.overview || "No description available"}
              </p>
            </div>

            {/* Additional Info Section */}
            <div className="mt-6">
              <ul className="list-none text-sm text-gray-400">
                <li className="mb-2">
                  Status:{" "}
                  <span className="text-white">{mediaDetails?.status}</span>
                </li>
                <li className="mb-2">
                  Released:{" "}
                  <span className="text-white">
                    {moment(
                      mediaDetails?.release_date || mediaDetails?.first_air_date
                    ).format("MMM Do, YYYY")}
                  </span>
                </li>
                <li className="mb-2">
                  Runtime:{" "}
                  <span className="text-white">
                    {mediaDetails?.runtime
                      ? formatRuntime(mediaDetails.runtime)
                      : "N/A"}
                  </span>
                </li>
                <li className="mb-2">
                  Genre:{" "}
                  <span className="text-white">
                    {mediaDetails?.genres?.map((genre) => (
                      <span key={genre.id} className="mr-1 hover:underline">
                        {genre.name}
                      </span>
                    ))}
                  </span>
                </li>
                <li className="mb-2">
                  Stars:{" "}
                  <span className="text-white flex flex-wrap gap-2">
                    {mediaDetails?.credits?.cast?.length > 0 ? (
                      mediaDetails?.credits?.cast.slice(0, 5).map((actor) => (
                        <div
                          key={actor.id}
                          className="group relative flex items-center space-x-2"
                        >
                          {/* Actor Image */}
                          <img
                            src={
                              actor.profile_path
                                ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                                : "/no_avatar.png"
                            }
                            alt={actor.name}
                            className="w-10 h-10 rounded-full object-cover border-2 border-white cursor-pointer"
                          />

                          {/* Actor Name */}
                          <span className="absolute bottom-0 left-0 right-0 text-center text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[9px]">
                            {actor.name}
                          </span>
                        </div>
                      ))
                    ) : (
                      <span>No stars available</span>
                    )}
                  </span>
                </li>
                <li className="mb-2">
                  Director:{" "}
                  <span className="text-white">
                    {mediaDetails?.credits?.crew?.filter(
                      (crew) => crew.job === "Director"
                    ).length > 0 ? (
                      mediaDetails?.credits?.crew
                        .filter((crew) => crew.job === "Director")
                        .map((director) => (
                          <span
                            key={director.id}
                            className="mr-1 hover:underline"
                          >
                            {director.name}
                          </span>
                        ))
                    ) : (
                      <span>N/A</span>
                    )}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Related Movies Section */}
      <div className="mt-[72rem] sm:mt-[64.5rem] md:mt-[40rem] lg:mt-[40rem] pb-8 pt-4">
        <Scrolling data={trendingMovies} heading="Trending" />
        <Scrolling data={recommendation} heading="Recommended" />
        <Scrolling data={similarMedia} heading="Similar" />
      </div>
    </div>
  );
};

export default DetailsPage;
