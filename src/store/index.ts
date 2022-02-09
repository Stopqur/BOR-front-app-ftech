import { persistStore } from 'redux-persist'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from './reducers/rootReducer'

export const store = createStore(rootReducer,  applyMiddleware(thunk))

export const persistor = persistStore(store)

const storePersistor = {
  store,
  persistor,
}

export default storePersistor