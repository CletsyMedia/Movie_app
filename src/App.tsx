import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./index.css";
import useFetchData from "@/hooks/useFetchData";

const App = () => {
  const { fetchData } = useFetchData();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <Helmet>
        <title>MovieHub - Discover Your Favorite Movies</title>
        <meta
          name="description"
          content="MovieHub is a movie discovery website where you can explore new releases, classics, and much more."
        />
        <meta
          name="keywords"
          content="movies, movie app, movie discovery, film, cinema, new releases"
        />
        <meta name="author" content="CletsyMedia" />
      </Helmet>
      <div className="bg-gradient-to-l from-red-900 via-red-800 to-gray-700">
        <Header />
        <div className="min-h-screen">
          <Outlet />
        </div>
        <div className="">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default App;
