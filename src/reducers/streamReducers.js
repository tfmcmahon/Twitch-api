import {
    GET_STREAM,
    GET_STREAMS_BY_GAME,
    TOP_STREAMS_LOADING,
    GET_TOP_STREAMS,
    STREAM_FADE_OFF,
    STREAM_FADE_ON,
    STREAMS_LOADING
} from '../actions/types'

const initialState = {
    stream: [],
    streams: [],
    streamLoading: false,
    topStreams: [],
    topStreamsLoading: false,
    fade: false
}

const streamReducers = function(state = initialState, action) {
    switch(action.type) {
        case STREAMS_LOADING:
            return {
                ...state,
                streamLoading: true
            }
        case TOP_STREAMS_LOADING:
            return {
                ...state,
                topStreamsLoading: true
            }
        case GET_STREAM:
            return {
                ...state,
                stream: action.payload.data,
                streamLoading: false
            }
        case GET_STREAMS_BY_GAME:
            return {
                ...state,
                streams: action.payload.data,
                streamLoading: false
            }    
        case GET_TOP_STREAMS:
            return {
                ...state,
                topStreams: action.payload.data,
                topStreamsLoading: false
            }
        case STREAM_FADE_ON:
            return {
                ...state,
                fade: true
            }
        case STREAM_FADE_OFF:
            return {
                ...state,
                fade: false
            }
        default:
            return state
    }
}

export default streamReducers