import {
    GET_USER,
    GET_USERS_BY_GAME,
    TOP_USERS_LOADING,
    GET_TOP_USERS,
    USER_FADE_OFF,
    USER_FADE_ON,
    USERS_LOADING
} from '../actions/types'

const initialState = {
    user: [],
    users: [],
    userLoading: false,
    topUsers: [],
    topUsersLoading: false,
    fade: false
}

const userReducers = function(state = initialState, action) {
    switch(action.type) {
        case USERS_LOADING:
            return {
                ...state,
                userLoading: true
            }
        case TOP_USERS_LOADING:
            return {
                ...state,
                topUsersLoading: true
            }
        case GET_USER:
            return {
                ...state,
                user: action.payload.data,
                userLoading: false
            }
        case GET_USERS_BY_GAME:
            return {
                ...state,
                users: action.payload.data,
                userLoading: false
            }
        case GET_TOP_USERS:
            return {
                ...state,
                topUsers: action.payload.data,
                topUsersLoading: false
            }
        case USER_FADE_ON:
            return {
                ...state,
                fade: true
            }
        case USER_FADE_OFF:
            return {
                ...state,
                fade: false
            }
        default:
            return state
    }
}

export default userReducers