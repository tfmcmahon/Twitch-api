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
    STREAMS_LOADING
} from './types'
import { getTopGames } from './gameActions'
import { getTopUsers, getUsersByGame, getUser } from './userActions'


const twitchID = config.TwitchID
const helix = axios.create({
    baseURL: 'https://api.twitch.tv/helix/',
    headers: {'Client-ID': twitchID}
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
export const getTopStreams = () => dispatch => {
    dispatch(setTopStreamsLoading())
    helix
        .get('streams?first=20') 
        .then(res => {
            streams = res.data.data
            gameIds = streams.map(stream => `id=${Number(stream.game_id)}`).join('&')
            userIds = streams.map(stream => `id=${Number(stream.user_id)}`).join('&')
            dispatch(getTopGames(gameIds)) // use the reuslting IDs to get the game names and art links
            dispatch(getTopUsers(userIds)) // use the reuslting IDs to get user profile images
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
export const getStream = searchData => dispatch => {
    dispatch(setStreamsLoading())
    helix
        .get(`streams?user_login=${searchData}`)
        .then(res => {
            userId = res.data.data[0].user_id
            dispatch(getUser(userId))
            dispatch({
                type: GET_STREAM,
                payload: res.data
            })
        })
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))    
        )
}

//GET https://api.twitch.tv/helix/stream?id=VAR
//Get streams by game
export const getStreamsByGame = searchData => dispatch => {
    dispatch(setStreamsLoading())
    helix
        .get(`streams?game_id=${searchData}`)
        .then(res => {
            streams = res.data.data
            userIds = streams.map(stream => `id=${Number(stream.user_id)}`).join('&')
            dispatch(getUsersByGame(userIds)) // use the reuslting IDs to get user profile images
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

//Stream scrape
export const streamScrape = () => dispatch => { //listData
    helix
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