import { SET_CURRENT_TWITCH_USER, CLEAR_TIME, TIMED_OUT } from '../actions/types'

const initialState = {
    authenticated: false,
    token: '',
    timedOut: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_CURRENT_TWITCH_USER:
            return {
                authenticated: action.payload.length > 0 ? true : false, // if the token exists, authenticate
                token: action.payload
            }
        case TIMED_OUT:
            return {
                timedOut: true
            }
        case CLEAR_TIME:
            return {
                timedOut: false
            }
        default:
            return state
    }
}