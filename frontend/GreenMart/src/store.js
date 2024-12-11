import { applyMiddleware, createStore } from 'redux'
import { loginReducer } from './redux/reducer'
import {thunk} from 'redux-thunk'


export const store = createStore(loginReducer , applyMiddleware(thunk))
