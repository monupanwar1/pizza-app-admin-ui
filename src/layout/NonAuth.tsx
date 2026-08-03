import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuthStore } from '../store';

const NonAuth = () => {
  // call getself

  const location = useLocation();

  const { user } = useAuthStore();

  const returnTo = new URLSearchParams(location.search).get('returnTo') || '/';

  if (user !== null) {
    return <Navigate to={returnTo} replace={true} />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default NonAuth;
