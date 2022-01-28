import React from 'react'
import { NavLink } from 'react-router-dom'
import { Card, Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'

import { authLoginEmailAction, authLoginPasswordAction, authLoginNameAction, authLoginDobAction } from '../store/actions/auth'
import { typeUseSelector } from '../store/hookUseSelector'


const RegistrationCard:React.FC = () => {
  const { email, password, username, dob } = typeUseSelector(store => store.authUser)
  const dispatch = useDispatch()

  return (
    <Card style={{width: '500px'}} className='border-0'>
      <h2 className='mb-4' style={{color: 'green'}}>Registration</h2>
      <Form>
        <Form.Control
          value={username}
          onChange={e => dispatch(authLoginNameAction(e.target.value))} 
          placeholder='username' 
        />
        <Form.Control
          value={email}
          onChange={e => dispatch(authLoginEmailAction(e.target.value))} 
          className='mt-2'
          placeholder='email' 
        />
        <Form.Control
          value={password}
          onChange={e => dispatch(authLoginPasswordAction(e.target.value))} 
          className='mt-2'
          placeholder='password' 
        />
        <Form.Control
          value={dob}
          onChange={e => dispatch(authLoginDobAction(e.target.value))} 
          className='mt-2'
          placeholder='dob' 
        />
      </Form>
      <div className='d-flex justify-content-between align-items-center pr-3 pl-3 pt-3'>
        <NavLink to='/api/auth/sign-in'> Sign in!</NavLink>
        <Button>Register</Button>
      </div>
    </Card>
  )
}

export default RegistrationCard