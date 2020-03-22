import { SET_CURRENT_TWITCH_USER } from '../actions/types'

const initialState = {
    authenticated: false,
    token: ''
}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_CURRENT_TWITCH_USER:
            return {
                authenticated: action.payload.length > 0 ? true : false, // if the token exists, authenticate
                token: action.payload
            }
        default:
            return state
    }
}