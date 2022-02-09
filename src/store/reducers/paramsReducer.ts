import { FilterSortTypes } from '../actions/params'

interface FilterSortRecipesAction {
  type: FilterSortTypes.GET_FILTER_SORT_RECIPES;
  payload: any;
}

interface InitialState {
  params: Object;
}

const initialState: InitialState = {
  params: {}
}

export const paramsReducer = (state = initialState, action: FilterSortRecipesAction): InitialState => {
  switch(action.type) {
    case FilterSortTypes.GET_FILTER_SORT_RECIPES:
      return {...state, params: action.payload}
    default: 
      return state
  }
}