import React, { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App.tsx";
import Loader from "../components/common/Loader.tsx";

// Lazy load the route components
const Home = React.lazy(() => import("../pages/Home.tsx"));
const ExplorePage = React.lazy(() => import("../pages/ExplorePage.tsx"));
const SearchPage = React.lazy(() => import("../pages/SearchPage.tsx"));
const DetailsPage = React.lazy(() => import("../pages/DetailsPage.tsx"));

// Set up the router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: ":explore",
        element: (
          <Suspense fallback={<Loader />}>
            <ExplorePage />
          </Suspense>
        ),
      },
      {
        path: ":explore/:id",
        element: (
          <Suspense fallback={<Loader />}>
            <DetailsPage />
          </Suspense>
        ),
      },
      {
        path: "search",
        element: (
          <Suspense fallback={<Loader />}>
            <SearchPage />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
