import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import './index.css'
import AxiosInstance from './api/AxiosInstance'
import { useDispatch } from 'react-redux'
import { setBannerdata, setImageBaseUrl } from './store/slice/movieSlice'

const App = () => {
    const dispatch = useDispatch();
    const fetchTrendingMovies = async () => {
        try {
            const response = await AxiosInstance.get("/trending/all/day");
            dispatch(setBannerdata(response.data.results));
            // console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    const fetchConfigurations = async () => {
        try {
            const response = await AxiosInstance.get("/configuration");
            dispatch(setImageBaseUrl(response.data.images.secure_base_url+"original"));
            // console.log("Configuration", response.data);
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        fetchTrendingMovies();
        fetchConfigurations();
    }, []);

  return (
    <div className='min-h-screen bg-gradient-to-l from-red-900 via-red-800 to-gray-700'>
        <Header />
        <Outlet />
        <Footer />
    </div>
  )
}

export default App
