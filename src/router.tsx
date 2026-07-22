import { createBrowserRouter } from 'react-router';
import Dashboard from './layout/Dashboard';
import NonAuth from './layout/NonAuth';
import LoginPage from './pages/login/login';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
    children: [
      {
        path: '',
      },
    ],
  },
  {
    path: '/',
    element: <NonAuth />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
    ],
  },
]);
