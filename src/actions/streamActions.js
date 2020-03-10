import axios from 'axios'
import config from '../config/config'
import { returnErrors } from './errorActions'
import {
    GET_STREAMER,
    TOP_STREAMS_LOADING,
    GET_TOP_STREAMS
} from './types'
import { getTopGames } from './gameActions'


const twitchID = config.TwitchID
const helix = axios.create({
    baseURL: 'https://api.twitch.tv/helix/',
    headers: {'Client-ID': twitchID}
})

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
    let topStreams, gameIds
    dispatch(setTopStreamsLoading())
    helix
        .get('streams?first=20') 
        .then(res => {
            topStreams = res.data.data
            gameIds = topStreams.map(stream => `id=${Number(stream.game_id)}`).join('&')
            dispatch(getTopGames(gameIds)) // use the reuslting IDs to get the game names and art links
            dispatch({
                type: GET_TOP_STREAMS,
                payload: res.data
            })
        })
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))    
        )
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