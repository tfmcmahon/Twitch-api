import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Search from '../SearchComponent'
import CardThumbnail from '../cards/CardThumbnailComponent'
import Transition from '../../images/transition1.svg'

import { getStreamsByGame } from '../../actions/streamActions'

const GameSearchPage = () => {
    const dispatch = useDispatch()
    const game = useSelector(state => state.game.game)
    const streams = useSelector(state => state.stream.streams)
    const [boxArtUrl, setBoxArtUrl] = useState('')
    const [gameName, setGameName] = useState('')
    const [gameId, setGameId] = useState('')
   
    useEffect(() => {
        if (game.length > 0) {
            let [{box_art_url}] = game
            let [{name}] = game
            let [{id}] = game
            //let [{profile_image_url}] = user
            setBoxArtUrl(
                box_art_url
                .replace('{width}', '240')
                .replace('{height}', '320')
            )
            setGameName(name)
            setGameId(id)
        }
    }, [game])

    useEffect(() => {
        dispatch(getStreamsByGame(gameId))
    }, [gameId])

    const thumbnailCards = streams.map(stream => 
        <CardThumbnail
            key={stream.id}
            type={stream.type}
            userId={stream.user_id} // match with top user state for profile art
            streamerName={stream.user_name}
            title={stream.title}
            viewerCount={stream.viewer_count}
            thumbnail={stream.thumbnail_url}
        />
    )

    if (game.length > 0) {
        return (
            <div>
                <Search />
                <img src={Transition} alt="transition graphic" className="landingImage"></img>
                <div className="gameHeadlineArtWrapper">
                    <p className="gameSearchedHeadline">Now viewing channels streaming</p>
                    <h3 className="gameSearchedTitle">{gameName}</h3>
                    <div className="gameSearchedBoxArtWrapper">
                    <img src={boxArtUrl} alt="box art" className="boxArt"/>
                    </div>
                </div>
                <div className="horizontalRule"></div>
                <div className="gameCardSection">
                    {thumbnailCards}
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <Search />
                <img src={Transition} alt="transition graphic" className="landingImage"></img>
                <div className="gameHeadlineArtWrapper">
                    <p className="gameSearchedHeadline"><b>Search by Game or Stream above</b></p>
                    <p className="gameSearchedHeadline">Twitch requires an exact match to return a result</p>
                    <p className="gameSearchedHeadline">If you have reached this page in error, try using the suggestions drop down when searching</p>
                    <img src="https://static-cdn.jtvnw.net/ttv-boxart/PLAYERUNKNOWN%27S%20BATTLEGROUNDS-{width}x{height}.jpg" alt="game not found" className="notFoundArt"/>
                </div>
            </div>
        )
    }
}

export default GameSearchPage