import axios from 'axios'
import config from '../config/config'
import { returnErrors } from './errorActions'
import {
    GET_STREAM,
    GET_STREAMS_BY_GAME,
    TOP_STREAMS_LOADING,
    GET_TOP_STREAMS,
    STREAM_FADE_OFF,
    STREAM_FADE_ON,
    STREAMS_LOADING,
    CLEAR_STREAMS
} from './types'
import { getTopGames } from './gameActions'
import { getTopUsers, getUsersByGame, getUser } from './userActions'


//initialize the helix request
export const helix = (twitchToken) => axios.create({
    baseURL: 'https://api.twitch.tv/helix/',
    headers: {
        'Client-ID': config.TwitchID,
        'Authorization': `Bearer ${twitchToken}` // add auth token to the requests
    }
})
let streams, gameIds, userId, userIds

//Games loading
//State action
export const setStreamsLoading = () => {
    return {
      type: STREAMS_LOADING
    }
}


//Top streams loading
//State action
export const setTopStreamsLoading = () => {
    return {
      type: TOP_STREAMS_LOADING
    }
}

//GET https://api.twitch.tv/helix/streams
//GET top streams
export const getTopStreams = (twitchToken) => dispatch => {
    dispatch(setTopStreamsLoading())
    helix(twitchToken)
        .get('streams?first=20') 
        .then(res => {
            streams = res.data.data
            gameIds = streams.map(stream => `id=${Number(stream.game_id)}`).join('&')
            userIds = streams.map(stream => `id=${Number(stream.user_id)}`).join('&')
            dispatch(getTopGames(gameIds, twitchToken)) // use the reuslting IDs to get the game names and art links
            dispatch(getTopUsers(userIds, twitchToken)) // use the reuslting IDs to get user profile images
            dispatch({
                type: GET_TOP_STREAMS,
                payload: res.data
            })
        })
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))    
        )
}

//GET https://api.twitch.tv/helix/streams?user_login=VAR
//Get streams
export const getStream = (twitchToken, searchData) => dispatch => {
    dispatch(setStreamsLoading())
    helix(twitchToken)
        .get(`streams?user_login=${searchData}`)
        .then(res => {
            if (res.data.data.length > 0) {
                userId = res.data.data[0].user_id
                dispatch(getUser(userId))
                dispatch({
                    type: GET_STREAM,
                    payload: res.data
                })
            } else {
                const error = {
                    msg: 'Stream not found',
                    status: 400,
                    id: null
                }
                dispatch(returnErrors(error, error.status))
            }
        })
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))    
        )
}

//GET https://api.twitch.tv/helix/stream?id=VAR
//Get streams by game
export const getStreamsByGame = (gameId, twitchToken) => dispatch => {
    dispatch(setStreamsLoading())
    helix(twitchToken)
        .get(`streams?game_id=${gameId}`)
        .then(res => {
            streams = res.data.data
            userIds = streams.map(stream => `id=${Number(stream.user_id)}`).join('&')
            dispatch(getUsersByGame(userIds, twitchToken)) // use the reuslting IDs to get user profile images
            dispatch({
                type: GET_STREAMS_BY_GAME,
                payload: res.data
            })
        })
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))    
        )
}

//Fade off
//State action
export const streamFadeOff = () => {
    return {
        type: STREAM_FADE_OFF
    }
}
  
//Fade on
//State action
export const streamFadeOn = () => {
    return {
        type: STREAM_FADE_ON
    }
}

//Clear streams
//State action
export const clearStreams = () => {
    return {
        type: CLEAR_STREAMS
    }
}

//Stream scrape
export const streamScrape = () => dispatch => { //listData
    helix()
        .get(`streams?first=100&after=ZXlKeklqb3hNRGM0TGpZeU5qSTVPRFF3TVRZMU1EVXNJbVFpT21aaGJITmxMQ0owSWpwMGNuVmxmUT09IGV5SnpJam8zTVRrdU56RXlPVGMxTVRRME16Z3lOQ3dpWkNJNlptRnNjMlVzSW5RaU9uUnlkV1Y5`) //${listData.number}
        .then(res => {
            let topgames = res.data.data // clean up/remove later
            console.log(topgames.map(game => game.user_name), res.data.pagination) // clean up/remove later
            dispatch({
                type: GET_TOP_STREAMS,
                payload: res.data
            })
        })
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))    
        )
}