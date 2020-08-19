import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
//reducers
import rootReducer from './reducers'
const store = createStore(rootReducer, applyMiddleware(thunk, logger))
export default store