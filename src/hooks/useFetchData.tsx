import { useDispatch } from 'react-redux';
import AxiosInstance from '@/api/AxiosInstance';
import { setBannerdata, setNowPlayingData, setTopRatedData, setPopularTvData, setOnAirData, setImageBaseUrl } from '@/store/slice/movieSlice';

const useFetchData = () => {
  const dispatch = useDispatch();


  const fetchTrendingMovies = async () => {
    try {
      const response = await AxiosInstance.get("/trending/all/day");
      dispatch(setBannerdata(response.data.results));
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    }
  };

  const fetchConfigurations = async () => {
    try {
      const response = await AxiosInstance.get("/configuration");
      dispatch(setImageBaseUrl(response.data.images.secure_base_url + "original"));
    } catch (error) {
      console.error("Error fetching configuration:", error);
    }
  };

  const fetchPlayingData = async () => {
    try {
      const response = await AxiosInstance.get("/movie/now_playing");
      dispatch(setNowPlayingData(response.data.results))
    } catch (error) {
      console.error("Error fetching now playing movies:", error);
    }
  };

  const fetchTopRatedData = async () => {
    try {
      const response = await AxiosInstance.get("/movie/top_rated");
      dispatch(setTopRatedData(response.data.results))
    } catch (error) {
      console.error("Error fetching top rated movies:", error);
    }
  }

  const fetchPopularTvData = async () => {
    try {
      const response = await AxiosInstance.get("/tv/popular");
      dispatch(setPopularTvData(response.data.results))
    } catch (error) {
      console.error("Error fetching popular tv shows:", error);
    }
  };

  const fetchOnAirData = async () => {
    try {
      const response = await AxiosInstance.get("/tv/on_the_air");
      dispatch(setOnAirData(response.data.results))
    } catch (error) {
      console.error("Error fetching on air tv shows:", error);
    }
  }

  // Fetch all necessary movie-related data
  const fetchData = async () => {
    await fetchTrendingMovies();
    await fetchConfigurations();
    await fetchPlayingData();
    await fetchTopRatedData();
    await fetchPopularTvData();
    await fetchOnAirData();
  };

  return { fetchData};
};

export default useFetchData;
