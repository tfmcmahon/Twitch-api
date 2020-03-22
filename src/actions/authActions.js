import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import jwtDecode from 'jwt-decode'
import config from '../config/config'
import { SET_CURRENT_TWITCH_USER } from './types'


// Function that will be called to refresh authorization
export const refreshAuthLogic = failedRequest => {
    let encodedRefreshToken = encodeURIComponent(refreshToken)
    axios
        .post(`https://id.twitch.tv/oauth2/token--data-urlencode?grant_type=refresh_token&refresh_token=${encodedRefreshToken}&client_id=${config.TwitchID}&client_secret=${config.Secret}`)
        .then(res => {
            console.log('refresh action', res)
            dispatch(setCurrentTwitchUser(res))
            return Promise.resolve()
        })
}
// Instantiate the interceptor (you can chain it as it returns the axios instance)
createAuthRefreshInterceptor(axios, refreshAuthLogic)

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
    //Save to local storage
    
    //Set token to local storage
    localStorage.setItem('jwtToken', twitchToken)

    //Set token to Auth header
    setAuthToken(twitchToken)

    //Decode token to get user data
    const decoded = jwtDecode(twitchToken)

    //Set current user
    dispatch(setCurrentTwitchUser(decoded))
}

//Set Twitch user
export const setCurrentTwitchUser = decoded => {
    return {
        type: SET_CURRENT_TWITCH_USER,
        payload: decoded
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


 