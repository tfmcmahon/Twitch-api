import axios from 'axios'
import config from '../config/config'
import { SET_CURRENT_TWITCH_USER } from './types'


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

    console.log(twitchToken)
    //Save to local storage
    
    //Set token to local storage
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

//Refresh Twitch token
export const refreshTwitchToken = (refreshToken) => dispatch => { 
    let encodedRefreshToken = encodeURIComponent(refreshToken)
    axios
        .post(`https://id.twitch.tv/oauth2/token--data-urlencode?grant_type=refresh_token&refresh_token=${encodedRefreshToken}&client_id=${config.TwitchID}&client_secret=${config.Secret}`)
        .then(res => {
            console.log('refresh action', res)
            dispatch(setCurrentTwitchUser(res))
        })
}


 