import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
    getTopStreams
} from '../../actions/streamActions'

import CardBoxArt from '../cards/CardBoxArtComponent'

const TopGames = () => {
    //const topGames = useSelector(state => state.game.topGames)
    const topStreams = useSelector(state => state.stream.topStreams)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTopStreams())
    }, []) //using an empty array should only allow this to update on mount

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
    return (
        <div className="gameCardSection">
            {boxArtCards}
        </div>
    )
}

export default TopGames