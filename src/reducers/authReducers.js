import { SET_CURRENT_TWITCH_USER } from '../actions/types'

const initialState = {
    authenticated: false,
    user: {},
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_CURRENT_TWITCH_USER:
            let userIsEmpty = Object.keys(action.payload)
            return {
                ...state,
                authenticated: userIsEmpty.length > 0 ? true : false, // if the user object exists, authenticate
                user: action.payload
            }
        default:
            return state
    }
}