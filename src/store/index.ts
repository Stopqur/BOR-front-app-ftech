import { persistStore } from 'redux-persist'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import mainReducer from './reducers/mainReducer'


export const store = createStore(mainReducer,  applyMiddleware(thunk))

export const persistor = persistStore(store)

const storePersistor = {
  store,
  persistor,
}

export default storePersistor