import { combineReducers } from 'redux'
import errorReducers from './errorReducers'
import gameReducers from './gameReducers'
import streamReducers from './streamReducers'
import userReducers from './userReducers'
import authReducers from './authReducers'
//import streamReducer from './streamReducers'

export default combineReducers({
    error: errorReducers,
    game: gameReducers,
    stream: streamReducers,
    user: userReducers,
    auth: authReducers
})