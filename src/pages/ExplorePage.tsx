import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AxiosInstance from "@/api/AxiosInstance";
import Card from "@/components/ui/Card";
import Pagination from "@/components/common/Pagination";
import Loader from "@/components/common/Loader";

const ExplorePage = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const fetchMoviesData = async () => {
    try {
      const response = await AxiosInstance.get(`/discover/movie`, {
        params: { page: pageNum },
      });
      setData(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.log("Error fetching movie:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTvData = async () => {
    try {
      const response = await AxiosInstance.get(`/tv/top_rated`, {
        params: { page: pageNum },
      });
      setData(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.log("Error fetching TV shows:", error);
    } finally {
      setIsLoading(false);
    }
  };

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

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (params.explore === "movie") {
        await fetchMoviesData();
      } else if (params.explore === "tv") {
        await fetchTvData();
      }
    };

    fetchData();
  }, [params.explore, pageNum]);

  const handlePageChange = (selectedPage: { selected: number }) => {
    setPageNum(selectedPage.selected + 1); // Adjust for zero-indexing in pagination
  };

  return (
    <div className="pt-24 mx-3 md:mx-6">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <>
          <div className="mx-auto">
            <h2 className="text-xl md:text-2xl capitalize text-white font-medium">
              Popular {params.explore}
            </h2>
          </div>
          <div className="mt-4 grid grid-cols-default mobile-sc gap-6">
            {data.map((item, index) => (
              <div className="flex justify-center" key={item.id + index}>
                <Card
                  data={item}
                  index={index}
                  label={item.label || params.explore}
                />
              </div>
            ))}
          </div>

          {/* Pass pageNum to Pagination to reflect the active page */}
          <Pagination
            pageCount={totalPages}
            onPageChange={handlePageChange}
            isMobile={isMobile}
            selectedPage={pageNum - 1}
          />
        </>
      )}
    </div>
  );
};

export default ExplorePage;
