import axios from 'axios'
import config from '../config/config'
import { returnErrors } from './errorActions'
import {
    GAMES_LOADING,
    TOP_GAMES_LOADING,
    GET_GAME,
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
//State action
export const setGamesLoading = () => {
    return {
      type: GAMES_LOADING
    }
}

//Top games loading
//State action
export const setTopGamesLoading = () => {
    return {
      type: TOP_GAMES_LOADING
    }
}

//GET https://api.twitch.tv/helix/games?name=VAR
//Get game
export const getGame = searchData => dispatch => {
    dispatch(setGamesLoading())
    helix
        .get(`games?name=${searchData}`)
        .then(res => {
            dispatch({
                type: GET_GAME,
                payload: res.data
            })
        })
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))    
        )
}

//GET https://api.twitch.tv/helix/games?id=VAR
//Get games landing
export const getTopGames = streamResult => dispatch => {
    dispatch(setGamesLoading())
    helix
        .get(`games?${streamResult}`)
        .then(res => {
            dispatch({
                type: GET_TOP_GAMES,
                payload: res.data
            })
        })
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))    
        )
}


//GET https://api.twitch.tv/helix/games/top
//Get top games
/*
export const getTopGames = () => dispatch => {
    dispatch(setTopGamesLoading())
    helix
        .get(`games/top`) //${listData.number}
        .then(res => {
            let topgames = res.data.data // clean up/remove later
            console.log(topgames.map(game => game.name)) // clean up/remove later
            dispatch({
                type: GET_TOP_GAMES,
                payload: res.data
            })
        })
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))    
        )
}
*/

//Fade off
//State action
export const gameFadeOff = () => {
    return {
        type: GAME_FADE_OFF
    }
}
  
//Fade on
//State action
export const gameFadeOn = () => {
    return {
        type: GAME_FADE_ON
    }
}

//Games scape
export const gamesScrape = () => dispatch => { //listData
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
