import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { recipeReducer } from './recipeReducer'
import { authUserReducer, userIdReducer } from './authUserReducer'
import { userDataReducer } from './userDataReducer'
import { wishListReducer } from './wishListReducer'
import { paramsReducer } from './paramsReducer'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['recipe', 'authUser', 'authUserId', 'dataUser', 'colorIcon', 'params', 'wishRecipes']
}

const rootReducer = combineReducers({
  recipe: recipeReducer,
  authUser: authUserReducer,
  authUserId: userIdReducer,
  dataUser: userDataReducer,
  wishRecipes: wishListReducer,
  params: paramsReducer
}) 
export default persistReducer(persistConfig, rootReducer)

export type MainState = ReturnType<typeof rootReducer>