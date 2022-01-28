import axios from 'axios'
import { Dispatch } from 'redux'

import { RecipeAction, RecipeActionTypes } from '../../types/recipe'

export const getRecipes = () => {
  return async (dispatch: Dispatch<RecipeAction>) => {
    try {
      const recipes = await axios.get('http://localhost:5000/api/recipe')
      dispatch({ type: RecipeActionTypes.GET_RECIPES, payload: recipes.data})
    } catch(e) {
      dispatch({ type: RecipeActionTypes.GET_RECIPES_ERROR, payload: `Any error!!! ${e}`})
    }

  }
}