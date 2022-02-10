import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Card, Form, Button, Row } from 'react-bootstrap';

import { getUserIdAction } from '../store/actions/auth';
import { registration } from '../api/userApi';

const RegistrationCard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [dob, setDob] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const createUser = async () => {
    try {
      if (username && email && password && dob) {
        const data: any = await registration({ username, email, password, dob });
        dispatch(getUserIdAction(data.id));
        navigate('/recipe');
      } else {
        setErrorMessage('Fill the form!');
      }
    } catch (e: any) {
      if (typeof e.response.data['validation error'] === 'undefined') {
        const validationError = e.response.data.message;
        setErrorMessage(validationError);
      } else {
        const validationError = e.response.data['validation error'].errors[0];
        setErrorMessage(validationError);
      }
    }
  };

  const checkDate = (e: any) => {
    setDob(e.target.value);
  };
  return (
    <Card style={{ width: '500px' }} className="border-0">
      <h2 className="mb-4" style={{ color: 'green' }}>
        Registration
      </h2>
      {errorMessage !== '' ? <div className="alert alert-danger">{errorMessage}</div> : null}
      <Form>
        <Form.Control
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <Form.Control
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2"
          placeholder="Email"
        />
        <Form.Control
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2"
          placeholder="Password"
          type="password"
        />
        <Form.Control
          value={dob}
          onChange={(e) => checkDate(e)}
          className="mt-2"
          placeholder="Dob"
          type="date"
          min="1900-01-01"
          max="2022-01-01"
          required
        />
      </Form>
      <Row className="d-flex justify-content-between align-items-center pt-3">
        <NavLink to="/api/auth/sign-in"> Sign in!</NavLink>
        <Button className="mt-3" onClick={createUser}>
          Register
        </Button>
      </Row>
    </Card>
  );
};

export default RegistrationCard;
