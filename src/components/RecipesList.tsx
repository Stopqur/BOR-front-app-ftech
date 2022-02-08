import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Button, ListGroup } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom'

import { UseSelectorType } from '../hooks/hookUseSelector'
import { getRecipes, getUserRecipes } from '../store/actions/recipe'
import RecipeItem from './RecipeItem'
import Sorting from './Sorting'


const RecipesList: React.FC = () => {
  const location = useLocation()
  const path = location.pathname
  const token = localStorage.getItem('token')
  const { recipes } = UseSelectorType((state) => state.recipe)
  const { userId } = UseSelectorType(state => state.authUserId)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (path === '/recipe') {
      dispatch(getRecipes())
    }
    else if (path === '/recipe/user/' + userId) {
      dispatch(getUserRecipes(userId))
    }
  }, [])

  const handleGetRecipes = () => {
    dispatch(getRecipes())
    navigate('/recipe') 
  }
  const handleGetUserRecipes = () => {
    dispatch(getUserRecipes(userId))
    navigate('/recipe/user/' + userId) 
  }
  
  return (
    <div className='px-5 py-5'>
      {token ?
        <div className='d-flex justify-content-center mb-3'>
          <Button 
            variant='outline-success'
            className='btn-recipes'
            onClick={() => handleGetRecipes()}
          >All recipes
          </Button>
          <Button 
            variant='outline-success'
            className='btn-recipes'
            onClick={() => handleGetUserRecipes()}
          >Your recipes
          </Button>
        </div>
      : null
      }
      <Sorting/>
      <ListGroup>
        {recipes.length > 0 ?
          recipes.map(item => {
            return (
            <RecipeItem 
              key={item.id} 
              item={item} 
              flagIcon={false} 
              token={token}
            />
            )
        })
        :
        <h2 className='text-center'>Recipe list is empty</h2>
      }
      </ListGroup>
    </div>
  )
}

export default RecipesList