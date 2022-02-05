import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Card, Form, Button, Row } from 'react-bootstrap'
import jwtDecode from 'jwt-decode'

import { host } from '../api'
import { getUserIdAction } from '../store/actions/auth'

const RegistrationCard:React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [dob, setDob] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  
  const createUser = async() => {
    try {
      if(username && email && password && dob) {
        const {data} = await host.post('api/auth/sign-up', { username, email, password, dob })
        localStorage.setItem('token', data.accessToken)
        dispatch(getUserIdAction(data.id))
        navigate('/recipe')
        return jwtDecode(data.accessToken)
      } else {
        setErrorMessage('Fill the form!')
      }
    } catch(e: any) {
        const validationError = e.response.data['validation error'].errors[0]
        setErrorMessage(validationError)    
    }
  }

  return (
    <Card style={{width: '500px'}} className='border-0'>
      <h2 className='mb-4' style={{color: 'green'}}>Registration</h2>
      {errorMessage !== '' ?
      <div className='alert alert-danger'>{errorMessage}</div>
      : null
      }
      <Form>
        <Form.Control
          value={username}
          onChange={e => setUsername(e.target.value)} 
          placeholder='username' 
        />
        <Form.Control
          value={email}
          onChange={e => setEmail(e.target.value)} 
          className='mt-2'
          placeholder='email' 
        />
        <Form.Control
          value={password}
          onChange={e => setPassword(e.target.value)} 
          className='mt-2'
          placeholder='password' 
          type='password'
        />
        <Form.Control
          value={dob}
          onChange={e => setDob(e.target.value)} 
          className='mt-2'
          placeholder='dob' 
        />
      </Form>
      <Row className='d-flex justify-content-between align-items-center pt-3'>
        <NavLink to='/api/auth/sign-in'> Sign in!</NavLink>
        <Button className='mt-3' onClick={() => createUser()}>Register</Button>
      </Row>
    </Card>
  )
}

export default RegistrationCard