import { createBrowserRouter } from 'react-router';
import Dashboard from './layout/Dashboard';
import NonAuth from './layout/NonAuth';
import Root from './layout/Root';
import HomePage from './pages/HomePage';
import LoginPage from './pages/login/login';
import Orders from './pages/orders/Orders';
import SingleOrder from './pages/orders/SingleOrder';
import Products from './pages/products/Products';
import Tenants from './pages/tenants/Tenants';
import Users from './pages/users/Users';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        element: <Dashboard />,
        children: [
          {
            path: '',
            element: <HomePage />,
          },
          {
            path: '/users',
            element: <Users />,
          },
          {
            path: '/products',
            element: <Products />,
          },
          {
            path: '/restaurants',
            element: <Tenants />,
          },
          {
            path: '/orders',
            element: <Orders />,
          },
          {
            path: '/orders/:orderId',
            element: <SingleOrder />,
          },
        ],
      },
      {
        path: '/auth',
        element: <NonAuth />,
        children: [
          {
            path: 'login',
            element: <LoginPage />,
          },
        ],
      },
    ],
  },
]);
