import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { recipeReducer } from './recipeReducer'
import { authUserReducer, userIdReducer } from './authUserReducer'
import { userDataReducer } from './userDataReducer'
import { wishListReducer } from './wishListReducer'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['recipe', 'authCheck', 'authUser', 'authUserId', 'dataUser', 'colorIcon']
}

const rootReducer = combineReducers({
  recipe: recipeReducer,
  authUser: authUserReducer,
  authUserId: userIdReducer,
  dataUser: userDataReducer,
  wishRecipes: wishListReducer
}) 
export default persistReducer(persistConfig, rootReducer)

export type mainState = ReturnType<typeof rootReducer>