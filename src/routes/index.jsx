import { Navigate, useRoutes } from 'react-router-dom';
import { lazy } from 'react';

import Suspense from '../utils/index';
import { useSelector } from 'react-redux';
import Private from './private/Private';

// import Home from './home/Home';
// import Auth from './auth/Auth';
// import Dashboard from './dashboard/Dashboard';

const Home = lazy(() => import('./home/Home'));
const Auth = lazy(() => import('./auth/Auth'));
const Dashboard = lazy(() => import('./dashboard/Dashboard'));

const RouteController = () => {
  const auth = useSelector(state => state.auth.token);

  return useRoutes([
    {
      path: "",
      element: <Suspense><Home /></Suspense>
    },
    {
      path: "auth",
      element: auth ? <Navigate to="/dashboard" /> : <Suspense><Auth /></Suspense>,
    },
    {
      path: "dashboard",
      element: <Suspense><Private /></Suspense>,
      children: [
        {
          path: "",
          element: <Suspense><Dashboard /></Suspense>,

        }
      ]
    }
  ]);
};

export default RouteController;
