import { useRoutes } from 'react-router-dom';
import Suspense from '../utils/index';

import Home from './home/Home';
import Auth from './auth/Auth';
import Dashboard from './dashboard/Dashboard';

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
