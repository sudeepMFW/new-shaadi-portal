import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NewLoginPage } from '@/components/NewLoginPage';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return <NewLoginPage />;
};

export default Index;
