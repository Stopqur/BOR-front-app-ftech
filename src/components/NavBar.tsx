import { Button, Nav } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import { typeUseSelector } from '../store/hookUseSelector'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { userDataAction } from '../store/actions/user'
import { $authhost } from '../api'



const NavBar:React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { authCheck } = typeUseSelector(store => store.authCheck)
  const { userId } = typeUseSelector(store => store.authUserId)
  console.log('authCheck', authCheck)
  
  const getProfile = async() => {
    try {
      const { data } = await $authhost.get('api/auth/user/' + userId)
      console.log(data)
      dispatch(userDataAction(data))
      const str = '/api/auth/user/' + userId
      navigate(str)  
    } catch(e) {
      console.log('error', e)
    }
  }

  return (
    <Navbar bg="dark" variant="dark">
      {authCheck ?
      <Nav>
        <Button onClick={() => getProfile()}>Profile</Button>
        <Nav.Link href='/api/auth/sign-in'>Logout</Nav.Link>
      </Nav>
      :
      <Nav>
        <Nav.Link href='/api/auth/sign-in'>Login</Nav.Link>
      </Nav>
      }
    </Navbar>
  )
}

export default NavBar