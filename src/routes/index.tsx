import React, { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';

// Lazy load the route components
const Home = React.lazy(() => import('@/pages/Home'));
const ExplorePage = React.lazy(() => import('@/pages/ExplorePage'));
const SearchPage = React.lazy(() => import('@/pages/SearchPage'));
const DetailsPage = React.lazy(() => import('@/pages/DetailsPage'));

// Set up the router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<div>Loading Home...</div>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: ":explore",
        element: (
          <Suspense fallback={<div>Loading Explore...</div>}>
            <ExplorePage />
          </Suspense>
        ),
      },
      {
        path: ":explore/:id",
        element: (
          <Suspense fallback={<div>Loading Details...</div>}>
            <DetailsPage />
          </Suspense>
        ),
      },
      {
        path: "search",
        element: (
          <Suspense fallback={<div>Loading Search...</div>}>
            <SearchPage />
          </Suspense>
        ),
      }
    ],
  },
]);

export default router;
