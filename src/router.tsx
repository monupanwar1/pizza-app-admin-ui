import { createBrowserRouter } from 'react-router';
import LoginPage from './pages/login/login';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage  />,
  },
]);
