import { applyMiddleware, combineReducers, createStore } from 'redux'
import { addtoCartReducer, loginReducer } from './redux/reducer'
import {thunk} from 'redux-thunk'

const combineReducer = combineReducers({
    auth : loginReducer , 
    cart : addtoCartReducer
})


export const store = createStore(combineReducer , applyMiddleware(thunk))
