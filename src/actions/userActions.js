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

//initialize the helix request
export const helix = (twitchToken) => axios.create({
    baseURL: 'https://api.twitch.tv/helix/',
    headers: {
        'Client-ID': config.TwitchID,
        'Authorization': `Bearer ${twitchToken}` // add auth token to the requests
    }
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
export const getTopUsers = (userIds, twitchToken) => dispatch => {
    dispatch(setUsersLoading())
    helix(twitchToken)
        .get(`users?${userIds}`)
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
export const getUsersByGame = (userIds, twitchToken) => dispatch => {
    dispatch(setUsersLoading())
    helix(twitchToken)
        .get(`users?${userIds}`) //id field is baked in from stream action since there are multiple searches and each one needs 'id=...'
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

//GET https://api.twitch.tv/helix/users?id=VAR
//Get user
export const getUser = (userId, twitchToken) => dispatch => {
    dispatch(setUsersLoading())
    helix(twitchToken)
        .get(`users?id=${userId}`)
        .then(res => {
            dispatch({
                type: GET_USER,
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