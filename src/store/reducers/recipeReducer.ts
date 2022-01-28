import { RecipeState, RecipeAction, RecipeActionTypes } from '../../types/recipe'

const initialState: RecipeState  = {
  recipes: [],
  error: null
}

export const recipeReducer = (state = initialState, action: RecipeAction): RecipeState => {
  switch (action.type) {
    case RecipeActionTypes.GET_RECIPES:
      return { error: null, recipes: action.payload }
    case RecipeActionTypes.GET_RECIPES_ERROR:
      return { error: action.payload, recipes: [] }
    default: 
      return state;
  }
}