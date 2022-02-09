interface WishState {
  wishRecipes: any[];
}

export enum WishActionTypes {
  GET_WISH_RECIPES = 'GET_WISH_RECIPES',
  ADD_WISH_RECIPES = 'ADD_WISH_RECIPES'
}

export interface IWishlistAction {
  type: WishActionTypes.GET_WISH_RECIPES | WishActionTypes.ADD_WISH_RECIPES;
  payload: any[];
}

const initialState: WishState = {
  wishRecipes: [],
}

export const wishListReducer = (state = initialState, action: IWishlistAction): WishState => {
  switch(action.type) {
    case WishActionTypes.GET_WISH_RECIPES:
      return {...state, wishRecipes: action.payload}
    default:
      return state
  }
} 