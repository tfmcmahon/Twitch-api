import axios from 'axios'
import config from '../config/config'
import { returnErrors } from './errorActions'
import {
    GAMES_LOADING,
    TOP_GAMES_LOADING,
    GET_GAMES,
    GET_TOP_GAMES,
    GAME_FADE_ON,
    GAME_FADE_OFF
} from './types'


const twitchID = config.TwitchID
const helix = axios.create({
    baseURL: 'https://api.twitch.tv/helix/',
    headers: {'Client-ID': twitchID}
})

//Games loading
export const setGamesLoading = () => {
    return {
      type: GAMES_LOADING
    }
}

//Top games loading
export const setTopGamesLoading = () => {
    return {
      type: TOP_GAMES_LOADING
    }
}

//Get games
export const getGames = gameData => dispatch => {
    dispatch(setGamesLoading())
    helix
        .get(`games?id=${gameData.id}`)
        .then(res => {
            dispatch({
                type: GET_GAMES,
                payload: res.data
            })
        })
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))    
        )
}

//Get top games
export const getTopGames = () => dispatch => { //listData
    dispatch(setTopGamesLoading())
    helix
        .get(`games/top?first=100`) //${listData.number}
        .then(res => {
            let topgames = res.data.data // clean up/remove later
            console.log(topgames.map(game => game.name), res.data.pagination) // clean up/remove later
            dispatch({
                type: GET_TOP_GAMES,
                payload: res.data
            })
        })
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))    
        )
}

//Fade off
export const gameFadeOff = () => {
    return {
        type: GAME_FADE_OFF
    }
}
  
//Fade on
export const gameFadeOn = () => {
    return {
        type: GAME_FADE_ON
    }
}