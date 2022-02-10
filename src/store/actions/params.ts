import { Dispatch } from 'redux';

export enum FilterSortTypes {
  GET_FILTER_SORT_RECIPES = 'GET_FILTER_SORT_RECIPES',
}

interface FilterSortRecipesAction {
  type: FilterSortTypes.GET_FILTER_SORT_RECIPES;
  payload: any;
}

export const getParamsAction = (params: any) => {
  return async (dispatch: Dispatch<FilterSortRecipesAction>) => {
    try {
      dispatch({ type: FilterSortTypes.GET_FILTER_SORT_RECIPES, payload: params });
    } catch (e) {
      console.log(e);
    }
  };
};
