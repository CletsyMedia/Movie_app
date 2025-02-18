import React, { useEffect } from "react";
import PageTransition from "../components/ui/PageTransition.tsx";
import BannerHome from "../components/ui/BannerHome.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../store/store.ts";
import Scrolling from "../components/common/Scrolling.tsx";
import useFetchData from "../hooks/useFetchData.tsx";

const Home: React.FC = () => {
  const trendingMovies =
    useSelector((state: RootState) =>
      Array.isArray(state.movieData.bannerData)
        ? state.movieData.bannerData
        : []
    ) || [];

  const nowPlayingMovie =
    useSelector((state: RootState) =>
      Array.isArray(state.movieData.nowPlayingData)
        ? state.movieData.nowPlayingData
        : []
    ) || [];

  const topRatedMovies =
    useSelector((state: RootState) =>
      Array.isArray(state.movieData.topRatedData)
        ? state.movieData.topRatedData
        : []
    ) || [];

  const popularTvMovies =
    useSelector((state: RootState) =>
      Array.isArray(state.movieData.popularTvData)
        ? state.movieData.popularTvData
        : []
    ) || [];

  const onAirMovies =
    useSelector((state: RootState) =>
      Array.isArray(state.movieData.onAirData) ? state.movieData.onAirData : []
    ) || [];

  const { fetchData } = useFetchData();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <PageTransition>
      <div className=" bg-transparent">
        <BannerHome />
        <Scrolling data={trendingMovies} heading="Trending" />
        <Scrolling data={nowPlayingMovie} heading="Now Playing" />
        <Scrolling data={topRatedMovies} heading="Top Rated" />
        <Scrolling data={popularTvMovies} heading="Popular TV-Show" />
        <Scrolling data={onAirMovies} heading="On Air" />
      </div>
    </PageTransition>
  );
};

export default Home;
