import axios from 'axios'
import { SET_CURRENT_TWITCH_USER, CLEAR_TIME, TIMED_OUT } from './types'


//Set Authorization token
export const setAuthToken = twitchToken => {
    if (twitchToken) {
        axios.defaults.headers.common["Authorization"] = twitchToken
    } else {
        delete axios.defaults.headers.common["Authorization"]
    }
}

//Login Twitch user
export const loginTwitchUser = twitchToken => dispatch => {
   
    //Save token to local storage
    localStorage.setItem('twitchToken', twitchToken)

    //Set token to header
    setAuthToken(twitchToken)

    //Set current user
    dispatch(setCurrentTwitchUser(twitchToken))
}

//Set Twitch user
export const setCurrentTwitchUser = token => {
    return {
        type: SET_CURRENT_TWITCH_USER,
        payload: token
    }
}

export const logoutTwitchUser = () => dispatch => { 
   
    //Remove token from local storage
    localStorage.removeItem('twitchToken')

    //Set token to header
    setAuthToken('')

    //Set current user
    dispatch(setCurrentTwitchUser(''))
}

export const clearTime = () => dispatch => {
    return {
        type: CLEAR_TIME
    }
}

export const timedOut = () => dispatch => {
    return {
        type: TIMED_OUT
    }
}