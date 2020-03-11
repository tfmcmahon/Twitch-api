import axios from 'axios'
import config from '../config/config'
import { returnErrors } from './errorActions'
import {
    USERS_LOADING,
    TOP_USERS_LOADING,
    GET_USERS_BY_GAME,
    GET_USER,
    GET_TOP_USERS,
    USER_FADE_ON,
    USER_FADE_OFF
} from './types'


const twitchID = config.TwitchID
const helix = axios.create({
    baseURL: 'https://api.twitch.tv/helix/',
    headers: {'Client-ID': twitchID}
})

//Users loading
//State action
export const setUsersLoading = () => {
    return {
      type: USERS_LOADING
    }
}

//Top users loading
//State action
export const setTopUsersLoading = () => {
    return {
      type: TOP_USERS_LOADING
    }
}

//GET https://api.twitch.tv/helix/users?id=VAR
//Get users landing
export const getTopUsers = streamResult => dispatch => {
    dispatch(setUsersLoading())
    helix
        .get(`users?${streamResult}`)
        .then(res => {
            dispatch({
                type: GET_TOP_USERS,
                payload: res.data
            })
        })
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))    
        )
}

//GET https://api.twitch.tv/helix/users?id=VAR
//Get users
export const getUsersByGame = streamResult => dispatch => {
    dispatch(setUsersLoading())
    helix
        .get(`users?${streamResult}`)
        .then(res => {
            dispatch({
                type: GET_USERS_BY_GAME,
                payload: res.data
            })
        })
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))    
        )
}

//Fade off
//State action
export const userFadeOff = () => {
    return {
        type: USER_FADE_OFF
    }
}
  
//Fade on
//State action
export const userFadeOn = () => {
    return {
        type: USER_FADE_ON
    }
}