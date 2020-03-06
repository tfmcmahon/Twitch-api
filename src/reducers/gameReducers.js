import {
    GAMES_LOADING,
    TOP_GAMES_LOADING,
    GET_GAMES,
    GET_TOP_GAMES,
    GAME_FADE_ON,
    GAME_FADE_OFF
} from '../actions/types'

const initialState = {
    game: [],
    gameLoading: false,
    topGames: [],
    topGamesLoading: false,
    fade: false
}

const gameReducers = function(state = initialState, action) {
    switch(action.type) {
        case GAMES_LOADING:
            return {
                ...state,
                gameLoading: true
            }
        case TOP_GAMES_LOADING:
            return {
                ...state,
                topGamesLoading: true
            }
        case GET_GAMES:
            return {
                ...state,
                game: action.payload.data,
                gameLoading: false
            }
        case GET_TOP_GAMES:
            return {
                ...state,
                topGames: action.payload.data,
                topGamesLoading: false
            }
        case GAME_FADE_ON:
            return {
                ...state,
                fade: true
            }
        case GAME_FADE_OFF:
            return {
                ...state,
                fade: false
            }
        default:
            return state
    }
}

export default gameReducers