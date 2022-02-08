import axios from 'axios'
import { Dispatch } from 'redux'

import { RecipeAction, RecipeActionTypes } from '../../types/recipe'
import { WishActionTypes, GetWishlistAction } from '../reducers/wishListReducer'

const URL = 'http://localhost:5000'

export const getRecipes = () => {
  return async (dispatch: Dispatch<RecipeAction>) => {
    try {
      const recipes = await axios.get(URL + '/api/recipe')
      dispatch({ type: RecipeActionTypes.GET_RECIPES, payload: recipes.data})
    } catch(e) {
      dispatch({ type: RecipeActionTypes.GET_RECIPES_ERROR, payload: `err!!! ${e}`})
    }
  }
}

export const getUserRecipes = (id: number | undefined) => {
  return async (dispatch: Dispatch<RecipeAction>) => {
    try {
      const recipes = await axios.get(URL + '/api/recipe/user/' + id)
      dispatch({ type: RecipeActionTypes.GET_USER_RECIPES, payload: recipes.data})
    } catch(e) {
      dispatch({ type: RecipeActionTypes.GET_RECIPES_ERROR, payload: `error!!! ${e}`})
    }
  }
}

export const deleteUserRecipe = (paramName: string, paramValue: string) => {
  return async (dispatch: Dispatch<RecipeAction>) => {
    try {
      const params = new URLSearchParams([[paramName, paramValue]]);
      const recipes = await axios.delete(URL + '/api/recipe/user/:id', { params })
      dispatch({type: RecipeActionTypes.GET_USER_RECIPES, payload: recipes.data})
    } catch(e) {
      console.log(e)
    }
  }
}

export const getWishList = (id: number | undefined) => {
  return async (dispatch: Dispatch<GetWishlistAction>) => {
    try {
      const wishRecipes = await axios.get(URL + '/api/wishlist/' + id)
      console.log('work')
      dispatch({type: WishActionTypes.GET_WISH_RECIPES, payload: wishRecipes.data})
    } catch(e) {
      console.log('any eeeeee', e)
    }
  }
}

export const getSortFilterRecipes = (params: any) => {
  return async (dispatch: Dispatch<RecipeAction>) => {
    try {
      let obj = {}
      let updateParams: any = params.map((item: any) => {
        let newItem = {
          [item.param]: item.value
        }
        obj = {...obj, [item.param]: item.value}
        return obj
      })
      
      console.log(obj)
      const sortFilterRecipes = await axios.get('http://localhost:5000/api/recipe/by', 
        { params: obj })  
      console.log(sortFilterRecipes)      
      dispatch({type: RecipeActionTypes.GET_SORT_FILTER_RECIPES, payload: sortFilterRecipes.data})
    } catch(e) {
      console.log('ERRROR', e)
    }
  }
}