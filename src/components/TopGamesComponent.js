import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
    getTopStreams
} from '../actions/streamActions'

import GameCard from './GameCardComponent'

const TopGames = () => {
    //const topGames = useSelector(state => state.game.topGames)
    const topStreams = useSelector(state => state.stream.topStreams)
    const dispatch = useDispatch()

    useEffect(() => {
        //dispatch(getTopStreams()) <=========================================uncomment to enable from page
    }, []) //using an empty array should only allow this to update on mount

    const gameCards = topStreams.map(stream => 
        <GameCard
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
            {gameCards}
        </div>
    )
}

export default TopGames