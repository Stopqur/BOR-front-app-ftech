export interface RecipeState {
  recipes: any[];
  error: null | string;
}

export enum RecipeActionTypes {
  GET_RECIPES = 'GET_RECIPES',
  GET_USER_RECIPES = 'GET_USER_RECIPES',
  GET_SORT_FILTER_RECIPES = 'GET_SORT_FILTER_RECIPES',
  GET_RECIPES_ERROR = 'GET_RECIPES_ERROR',
}

interface GetRecipeAction {
  type:
    | RecipeActionTypes.GET_RECIPES
    | RecipeActionTypes.GET_USER_RECIPES
    | RecipeActionTypes.GET_SORT_FILTER_RECIPES;
  payload: any[];
}

interface GetRecipeErrorAction {
  type: RecipeActionTypes.GET_RECIPES_ERROR;
  payload: string;
}

export type RecipeAction = GetRecipeAction | GetRecipeErrorAction;
