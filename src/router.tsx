import { createBrowserRouter } from 'react-router';
import Dashboard from './layout/Dashboard';
import NonAuth from './layout/NonAuth';
import Root from './layout/Root';
import LoginPage from './pages/login/login';

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
