import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, ListGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import { UseSelectorType } from '../hooks/hookUseSelector'
import { getRecipes, getSortFilterRecipes, getUserRecipes } from '../store/actions/recipe'
import RecipeItem from './RecipeItem'
import Sorting from './Sorting'


const RecipesList: React.FC = () => {
  const token = localStorage.getItem('token')
  const { recipes, error } = UseSelectorType((state) => state.recipe)
  const { userId } = UseSelectorType(state => state.authUserId)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const url: any = window.location
  const paramUrl: any = (new URL(url)).searchParams.get('complexity') || '0'
  const [complexityValue, setComplexityValue] = useState<string>(paramUrl)
  
  const sortComplexity = (param: string, paramValue: string) => {
    if(param === 'complexity' && paramValue !=='ASC' && paramValue!=='DESC') {
      setComplexityValue(paramValue)
    }
    navigate(`/recipe/get/?${param}=${paramValue}`)  
    dispatch(getSortFilterRecipes(param, paramValue))
  }

  if(error) {
    return <h2>{error}</h2>
  }

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
      <Sorting sortComplexity={sortComplexity} complexityValue={complexityValue}/>
      <ListGroup>
        {recipes.length > 0 ?
          recipes.map(item => {
            return <RecipeItem key={item.id} item={item} flagIcon={false} token={token}/>
        })
        :
        <h2 className='text-center'>Recipe list is empty</h2>
      }
      </ListGroup>
    </div>
  )
}

export default RecipesList