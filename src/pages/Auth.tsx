import React from 'react';
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

import LoginCard from '../components/LoginCard';
import RegistrationCard from '../components/RegistrationCard';

const Auth: React.FC = () => {
  const location = useLocation();
  const isAuthPath = location.pathname === '/api/auth/sign-in';
  return (
    <Container className="d-flex justify-content-center mt-5">
      {isAuthPath ? <LoginCard /> : <RegistrationCard />}
    </Container>
  );
};

export default Auth;
