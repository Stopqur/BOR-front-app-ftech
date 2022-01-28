import React from 'react'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Card, Form, Button, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'

import { getUserIdAction } from '../store/actions/auth'
import { typeUseSelector } from '../store/hookUseSelector'
import { login } from '../api/userApi'
import { authCheckAction } from '../store/actions/auth'

const LoginCard:React.FC = () => {
  const { authCheck } = typeUseSelector(store => store.authCheck)
  // const { userId } = typeUseSelector(store => store.authUserId)
  const dispatch = useDispatch()
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [emailPlaceholder, setEmailPlaceHolder] = useState<string>('Username@mail.ru')
  const [passwordPlaceHolder, setPasswordPlaceHolder] = useState<string>('Password')
  const [checkField, setCheckField] = useState<boolean>(true)

  const navigate = useNavigate()

  const signIn = async () => {
    if (!email && !password) {
      setCheckField(false)
      setEmailPlaceHolder('Write email!');
      setPasswordPlaceHolder('Write password!');
    }
    else if(!email) {
      setCheckField(false)
      setEmailPlaceHolder('Write email!');
    } 
    else if (!password) {
      setCheckField(false)
      setPasswordPlaceHolder('Write password!');
    }
    else {
        try {
          const response:any = await login(email, password)
          dispatch(getUserIdAction(response.id))
          dispatch(authCheckAction(true))
          navigate('/api/auth/recipe')   
      } catch(e:any) {
          dispatch(authCheckAction(false))
          setErrorMessage(e.response.data.message)
          console.log(e.response.data.message)
      }
    }
  }
  return (
    <Card style={{width: '500px'}} className='border-0'>
      <h2 className='mb-4' style={{color: 'green'}}>Authorization</h2>
      {authCheck === false && errorMessage !== ''
      ? <div className='alert alert-danger'>{errorMessage}</div>
      : console.log(authCheck)
      }
      <Form>
        {checkField === false && !email ?
          <Form.Control
            className='input__check-empty'
            value={email}
            onChange={e => setEmail(e.target.value)} 
            placeholder={emailPlaceholder} 
          />
        : 
          <Form.Control
            value={email}
            onChange={e => setEmail(e.target.value)} 
            placeholder={emailPlaceholder} 
          />
        }
        {checkField === false && !password ?
          <Form.Control
            className='input__check-empty mt-2'
            value={password}
            onChange={e => setPassword(e.target.value)} 
            placeholder={passwordPlaceHolder}
          />
        :
        <Form.Control
          value={password}
          onChange={e => setPassword(e.target.value)} 
          className='mt-2'
          placeholder={passwordPlaceHolder} 
        />
      }
        <Row className='d-flex justify-content-between align-items-center pt-3'>
          <NavLink to='/api/auth/sign-up'>Sign up!</NavLink>
          <Button className='mt-3' onClick={() => signIn()}>Login</Button>
        </Row>
      </Form>
    </Card>
  )
}

export default LoginCard