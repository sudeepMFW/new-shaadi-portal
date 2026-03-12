import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginPage } from '@/components/LoginPage';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return <LoginPage />;
};

export default Index;
