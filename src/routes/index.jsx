import { useRoutes } from 'react-router-dom';
import { lazy } from 'react';

import Suspense from '../utils/index';
import { useSelector } from 'react-redux';

import Home from './home/Home';
import Auth from './auth/Auth';
import Dashboard from './dashboard/Dashboard';

// const Home = lazy(() => import('./home/Home'));
// const Auth = lazy(() => import('./auth/Auth'));
// const Dashboard = lazy(() => import('./dashboard/Dashboard'));

const RouteController = () => {
  
  return useRoutes([
    {
      path: "",
      element: <Suspense><Home /></Suspense>
    },
    {
      path: "auth",
      element: <Suspense><Auth /></Suspense>,
    },
    {
      path: "dashboard",
      element: <Suspense><Dashboard /></Suspense>,
    }
  ]);
};

export default RouteController;
