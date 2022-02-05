import { RecipeState, RecipeAction, RecipeActionTypes } from '../../types/recipe'

const initialState: RecipeState  = {
  recipes: [],
  error: null
}

export const recipeReducer = (state = initialState, action: RecipeAction): RecipeState => {
  switch (action.type) {
    case RecipeActionTypes.GET_RECIPES:
      return { ...state, error: null, recipes: action.payload }
    case RecipeActionTypes.GET_USER_RECIPES:
      return { ...state, error: null, recipes: action.payload }
    case RecipeActionTypes.GET_RECIPES_ERROR:
      return { ...state, error: action.payload, recipes: [] }
    case RecipeActionTypes.GET_SORT_FILTER_RECIPES:
      return { ...state, error: null, recipes: action.payload}
    default: 
      return state;
  }
}