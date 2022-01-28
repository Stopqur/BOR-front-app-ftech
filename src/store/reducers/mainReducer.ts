import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { recipeReducer } from './recipeReducer'
import { authReducer } from './authCheckReducer'
import { authUserReducer, userIdReducer } from './authUserReducer'
import { userDataReducer } from './userDataReducer'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['recipe', 'authCheck', 'authUser', 'authUserId', 'dataUser',]
}

const mainReducer = combineReducers({
  recipe: recipeReducer,
  authCheck: authReducer,
  authUser: authUserReducer,
  authUserId: userIdReducer,
  dataUser: userDataReducer
}) 
export default persistReducer(persistConfig, mainReducer)

export type mainState = ReturnType<typeof mainReducer>