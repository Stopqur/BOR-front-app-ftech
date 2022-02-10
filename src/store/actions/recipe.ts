import axios from 'axios';
import { Dispatch } from 'redux';

import { RecipeAction, RecipeActionTypes } from '../../types/recipe';
import { WishActionTypes, IWishlistAction } from '../reducers/wishListReducer';
import baseURL from '../../config/url';
import { authHost } from '../../api';

export const getRecipes = () => {
  return async (dispatch: Dispatch<RecipeAction>) => {
    try {
      const recipes = await axios.get(baseURL + '/api/recipe');
      dispatch({ type: RecipeActionTypes.GET_RECIPES, payload: recipes.data });
    } catch (e) {
      dispatch({ type: RecipeActionTypes.GET_RECIPES_ERROR, payload: `err!!! ${e}` });
    }
  };
};

export const getUserRecipes = (id: number | undefined) => {
  return async (dispatch: Dispatch<RecipeAction>) => {
    try {
      const recipes = await axios.get(baseURL + '/api/recipe/user/' + id);
      dispatch({ type: RecipeActionTypes.GET_USER_RECIPES, payload: recipes.data });
    } catch (e) {
      dispatch({ type: RecipeActionTypes.GET_RECIPES_ERROR, payload: `error!!! ${e}` });
    }
  };
};

export const deleteUserRecipe = (paramName: string, paramValue: string) => {
  return async (dispatch: Dispatch<RecipeAction>) => {
    try {
      const params = new URLSearchParams([[paramName, paramValue]]);
      const recipes = await axios.delete(baseURL + '/api/recipe/user/:id', { params });
      dispatch({ type: RecipeActionTypes.GET_USER_RECIPES, payload: recipes.data });
    } catch (e) {
      console.log(e);
    }
  };
};

export const addWishRecipe = (recipeId: any, userId: any) => {
  return async (dispatch: Dispatch<IWishlistAction>) => {
    try {
      const wishRecipe = await authHost.post('/api/recipe/', { recipeId, user_id: userId });
      dispatch({ type: WishActionTypes.ADD_WISH_RECIPES, payload: wishRecipe.data });
    } catch (e) {
      console.log(e);
    }
  };
};

export const getWishList = (id: number | undefined) => {
  return async (dispatch: Dispatch<IWishlistAction>) => {
    try {
      const wishRecipes = await axios.get(baseURL + '/api/wishlist/' + id);
      dispatch({ type: WishActionTypes.GET_WISH_RECIPES, payload: wishRecipes.data });
    } catch (e) {
      console.log('any error', e);
    }
  };
};

export const getSortFilterRecipes = (params: any) => {
  return async (dispatch: Dispatch<RecipeAction>) => {
    try {
      const sortFilterRecipes = await axios.get(baseURL + '/api/recipe', { params });
      dispatch({
        type: RecipeActionTypes.GET_SORT_FILTER_RECIPES,
        payload: sortFilterRecipes.data,
      });
    } catch (e) {
      console.log('Error', e);
    }
  };
};
