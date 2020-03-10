import { combineReducers } from 'redux'
import errorReducers from './errorReducers'
import gameReducers from './gameReducers'
import streamReducers from './streamReducers'
//import streamReducer from './streamReducers'

export default combineReducers({
    error: errorReducers,
    game: gameReducers,
    stream: streamReducers
})