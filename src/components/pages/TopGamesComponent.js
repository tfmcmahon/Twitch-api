import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTopStreams, streamFadeOn } from '../../actions/streamActions'
import { setAuthToken } from '../../actions/authActions'

import CardBoxArt from '../cards/CardBoxArtComponent'

const TopGames = () => {
    const dispatch = useDispatch()
    const topStreams = useSelector(state => state.stream.topStreams)
    const topStreamsLoading = useSelector(state => state.stream.topStreamsLoading)
    const topGamesLoading = useSelector(state => state.game.topGamesLoading)
    const error = useSelector(state => state.error)
    const streamFade = useSelector(state => state.stream.fade)
    const accessToken = useSelector(state => state.auth.token)

    useEffect(() => { // handle expired token -- twitch docs suggest refreshing a token upon server rejection
        if (error.msg.status === 401) {
            dispatch(setAuthToken(''))
        }
    }, [error])


    useEffect(() => {
        dispatch(getTopStreams(accessToken.access_token))
    }, []) //using an empty array should only allow this to update on mount

    useEffect(() => {
        if (!topStreamsLoading) {
            dispatch(streamFadeOn())
        }
    }, [topStreamsLoading])

    const boxArtCards = topStreams.map(stream => 
        <CardBoxArt
            key={stream.id}
            type={stream.type}
            gameId={stream.game_id} // match with top game state for game box art
            userId={stream.user_id} // match with top user state for profile art
            streamerName={stream.user_name}
            title={stream.title}
            viewerCount={stream.viewer_count}
            thumbnail={stream.thumbnail_url}
        />
    )

    if (topStreamsLoading || topGamesLoading) { // loading circle if streams are loading
        return (
            <div className="loadingWrapper">
                <div className="loading"></div>
            </div>
        )
    } else { // render the top streams
        return (
            <div className={streamFade ? null : "gameFadeOut"}>
                <div className="gameFadeIn">
                    <div className="gameCardSection">
                        {boxArtCards}
                    </div>
                </div>
            </div>
        )
    }
}

export default TopGames