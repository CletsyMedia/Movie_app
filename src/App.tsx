import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './index.css';
import useFetchData from '@/hooks/useFetchData';

const App = () => {
  const { fetchData } = useFetchData();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className='min-h-screen bg-gradient-to-l from-red-900 via-red-800 to-gray-700'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;
