import { Navigate, Outlet } from 'react-router';
import { useAuthStore } from '../store';

const Dashboard = () => {
  const { user } = useAuthStore();
  if (!user) {
    return <Navigate to='/login' replace />;
  }
  return (
    <div>
      Welocome to Dashboard
      <Outlet />
    </div>
  );
};

export default Dashboard;
