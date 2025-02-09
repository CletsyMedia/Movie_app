import {  configureStore } from '@reduxjs/toolkit';
import movieReducer from '@/store/slice/movieSlice';

export const store = configureStore({
    reducer: {
        movieData: movieReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
