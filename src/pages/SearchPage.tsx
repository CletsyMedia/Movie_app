import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AxiosInstance from "../api/AxiosInstance.tsx";
import Card from "../components/ui/Card.tsx";
import Loader from "../components/common/Loader.tsx";
import Pagination from "../components/common/Pagination.tsx";

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  const fetchSearchData = async (query: string) => {
    try {
      setIsLoading(true);
      const response = await AxiosInstance.get(`/search/multi`, {
        params: { query, page: pageNum },
      });
      setData(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.log("Error fetching search results:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search).get("q");
    if (!query) {
      navigate("/"); // Redirect to home if no query
      return;
    }

    fetchSearchData(query); // Fetch the data when query changes
  }, [location.search, pageNum, navigate]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handlePageChange = (selectedPage: { selected: number }) => {
    setPageNum(selectedPage.selected + 1);
  };

  return (
    <div className="pt-24 mx-3 md:mx-6">
      <div className="mx-auto">
        <h1 className="text-xl md:text-2xl capitalize text-white font-medium">
          Search result
        </h1>
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <Loader />
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-default mobile-sc gap-6">
            {data.map((searchData, index) => (
              <div className="flex justify-center" key={searchData.id + index}>
                <Card
                  data={searchData}
                  index={index}
                  label={searchData.label || searchData.explore}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <Pagination
        pageCount={totalPages}
        onPageChange={handlePageChange}
        isMobile={isMobile}
        selectedPage={pageNum}
      />
    </div>
  );
};

export default SearchPage;
