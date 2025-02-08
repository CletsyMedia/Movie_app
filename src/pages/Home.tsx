import React from 'react';
import PageTransition from '../components/ui/PageTransition';
import BannerHome from '../components/ui/BannerHome';
import { useSelector } from 'react-redux';
import Card from '../components/ui/Card';
import { RootState } from '../store/store';

const Home: React.FC = () => {
    const trendingMovies = useSelector((state: RootState) => Array.isArray(state.movieData.bannerData) ? state.movieData.bannerData : []) || [];

    return (
        <PageTransition>
            <div>
                <BannerHome />
                <h3 className="text-2xl font-bold text-white px-4 mt-6">TRENDING</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                    {trendingMovies.map((movie, index) => (
                        <Card key={movie.id} data={movie} index={index} />
                    ))}
                </div>
            </div>
        </PageTransition>
    );
};

export default Home;
