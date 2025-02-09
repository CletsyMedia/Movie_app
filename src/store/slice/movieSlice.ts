import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Movie {
  id: number;
  title: string;
  name: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  popularity: number;
  overview: string;
  release_date: string;
  genre: string;
  media_type: string;
}

export interface BannerState {
  bannerData: Movie[];
  nowPlayingData: Movie[];
  topRatedData: Movie[];
  popularTvData: Movie[];
  onAirData: Movie[];
  imageBaseUrl: string;
}

const initialState: BannerState = {
  bannerData: [],
  nowPlayingData: [],
  topRatedData: [],
  popularTvData: [],
    onAirData: [],
  imageBaseUrl: '',
};

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setBannerdata: (state, action: PayloadAction<Movie[]>) => {
      state.bannerData = action.payload;
    },
    setNowPlayingData: (state, action: PayloadAction<Movie[]>) => {
        state.topRatedData = action.payload;
    },
    setTopRatedData: (state, action: PayloadAction<Movie[]>) => {
        state.nowPlayingData = action.payload;
    },
    setPopularTvData: (state, action: PayloadAction<Movie[]>) => {
        state.popularTvData = action.payload;
    },
    setOnAirData: (state, action: PayloadAction<Movie[]>) => {
        state.onAirData = action.payload;
    },
    setImageBaseUrl: (state, action: PayloadAction<string>) => {
      state.imageBaseUrl = action.payload;
    },
  },
});

export const { setBannerdata, setNowPlayingData, setTopRatedData, setPopularTvData, setOnAirData, setImageBaseUrl } = movieSlice.actions;

export default movieSlice.reducer;
