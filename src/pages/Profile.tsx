import React, { useState } from 'react'
import { Button, Card, Container, Form, FormControl } from 'react-bootstrap'

import { UseSelectorType } from '../hooks/hookUseSelector'
import { authhost } from '../api'

const Profile:React.FC = () => {
  const { userId } = UseSelectorType(store => store.authUserId)
  const { userData } = UseSelectorType(store => store.dataUser)

  const [newEmail, setNewEmail] = useState<string>(userData.email)
  const [typeField, setTypeField] = useState<boolean>(false)

  const updateEmail = () => {
    setTypeField(true)
  }

  const saveEmail = async(email:string) => {
    try {
      const user = await authhost.put('api/auth/user/' + userId, {email: email})
      setTypeField(false)
      return user
    } catch(e) {
      console.log('ERROR', e)
    }
  }

  return (
    <Container className='d-flex flex-column align-items-center'>
      <h2>Profile</h2>
      <Card style={{width: '500px', border: 'none'}}>
        <div className='d-flex flex-column'>
          <div className='d-flex align-items-center justify-content-between mb-4 border-top border-success pt-4'>
            <p className='profile__description'>Username:</p>
            <p className=''>{userData.username}</p>
          </div>
          <Form>
            <div className='d-flex justify-content-between align-items-center border-top border-success pt-4'>
              <p className='profile__description'>Email: </p>
              {typeField ?
              <React.Fragment>
                <div className='mw-75 ml-2'>
                  <FormControl
                    value={newEmail}
                    onChange={e => setNewEmail(e.target.value)} 
                  />
                </div>
                <Button 
                  onClick={() => saveEmail(newEmail)} 
                  type='button'
                >Save
                </Button>
              </React.Fragment>
              :
              <React.Fragment>
                <div className='mw-75 ml-2'>
                  <p> {newEmail}</p>
                </div>
                <Button 
                  onClick={() => updateEmail()} 
                  type='button'
                >Change
                </Button>
              </React.Fragment>
              }
            </div>
          </Form>
          <div className='d-flex align-items-center justify-content-between mb-4'>
          </div>
          <div className='d-flex align-items-center justify-content-between border-top border-success pt-4'>
            <p className='profile__description'>DOB:</p>
            <p className=''>{userData.dob}</p>
          </div>
        </div>
      </Card>
    </Container>
  )
}

export default Profile