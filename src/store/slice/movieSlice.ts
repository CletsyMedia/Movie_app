import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BannerState {
    bannerData: string;
    imageBaseUrl: string;
}

const initialState: BannerState = {
    bannerData: '',
    imageBaseUrl: '',

}
export const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        setBannerdata: (state, action: PayloadAction<string>) => {
            state.bannerData = action.payload;
        },
        setImageBaseUrl: (state, action: PayloadAction<string>) => {
            state.imageBaseUrl = action.payload;
        }
    }
});

export const { setBannerdata, setImageBaseUrl } = movieSlice.actions;

export default movieSlice.reducer;
