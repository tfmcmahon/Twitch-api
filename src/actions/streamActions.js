import axios from 'axios'
import config from '../config/config'
import { returnErrors } from './errorActions'
import {
    GET_STREAMER,
    TOP_STREAMS_LOADING,
    GET_TOP_STREAMS
} from './types'

const twitchID = config.TwitchID
const helix = axios.create({
    baseURL: 'https://api.twitch.tv/helix/',
    headers: {'Client-ID': twitchID}
})

//Top streams loading
export const setTopStreamsLoading = () => {
    return {
      type: TOP_STREAMS_LOADING
    }
}

//Get top streams
export const getTopStreams = () => dispatch => { //listData
    dispatch(setTopStreamsLoading())
    helix
        .get(`streams?first=100&after=`) //${listData.number}
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