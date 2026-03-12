import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NewDashboard } from '@/components/NewDashboard';
import { useAuth } from '@/hooks/useAuth';

const DashboardPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <NewDashboard />
  );
};

export default DashboardPage;
