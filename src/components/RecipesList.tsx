import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ListGroup } from 'react-bootstrap'

import { typeUseSelector } from '../store/hookUseSelector'
import { getRecipes } from '../store/actions/recipe'
import Recipe from './Recipe'

const RecipesList: React.FC = () => {
  const { recipes, error } = typeUseSelector((state) => state.recipe)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getRecipes())
  }, [])

  if(error) {
    return <h2>{error}</h2>
  }

  return (
    <div>
      <ListGroup>
        {recipes.map(item => {
          return <Recipe key={item.id} item={item}/>
        })}
      </ListGroup>
    </div>
  )
}

export default RecipesList